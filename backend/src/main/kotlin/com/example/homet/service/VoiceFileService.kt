package com.example.homet.service

import com.amazonaws.AmazonServiceException
import com.amazonaws.SdkClientException
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import com.example.homet.dto.VoiceFileRequest
import com.example.homet.entity.VoiceFile
import com.example.homet.repository.VoiceFileRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.Date
import java.util.UUID
import org.springframework.web.multipart.MultipartFile

@Service
data class VoiceFileService(
    private val voiceFileRepository: VoiceFileRepository,
    private val amazonS3: AmazonS3,
    ){

    fun getVoiceAllFiles(): List<VoiceFile>{
        return voiceFileRepository.findAll()
    }

    fun getUrlFromS3(voiceFileId: Long,userDbId:Long): String? {
        val s3Key = if(voiceFileId == 0L) {
            "audio/tutorial.mp3"
        }else{
            val voiceFile = voiceFileRepository.findByIdOrNull(voiceFileId)

            if(voiceFile == null || voiceFile.receiverId != userDbId){
                return null
            }
            voiceFile.s3Key
        }

        // JAVA,Kotlin,S3もUTCで処理(有効期限は取得時より60分)
        val expiredAt = Date.from(Instant.now().plus(60, ChronoUnit.MINUTES))

        try{
            val url = amazonS3.generatePresignedUrl("homet-audio-mp3", s3Key, expiredAt)
            return url.toString()
        }catch (e: AmazonServiceException){
            println("failed to download audio file(AmazonServiceException): ${e.message}")
            return ""
        }catch (e: SdkClientException){
            println("failed to download audio file(SdkClientException): ${e.message}")
            return ""
        }
    }

    fun putVoiceForS3(request: VoiceFileRequest):Result<Unit>{
        // create s3_key
        val s3Key = "audio/${UUID.randomUUID()}.mp3"
        val file = request.file

        return runCatching {
            amazonS3.putObject(
                PutObjectRequest("homet-audio-mp3", s3Key, file.inputStream, ObjectMetadata().apply {
                    contentType = file.contentType ?: "audio/mp3"
                    contentLength = file.size
                })
            )
            val voice = VoiceFile(
                senderId = request.sender_id,
                receiverId = request.receiver_id,
                fileName = file.originalFilename ?: "",
                s3Key = s3Key,
                firstPlayedAt = null,
                playFlag = true
            )
            voiceFileRepository.save(voice)
        }


    }
}
