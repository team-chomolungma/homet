package com.example.homet.service

import com.amazonaws.AmazonServiceException
import com.amazonaws.SdkClientException
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import com.example.homet.dto.VoiceFileRequest
import com.example.homet.dto.VoiceFileResponse
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
    private val userService: UserService,
    private val amazonS3: AmazonS3,
) {
    val bucketName = System.getenv("S3_BUCKET_NAME")
    fun getVoiceAllFiles(): List<VoiceFile> {
        return voiceFileRepository.findAll()
    }

    fun getUrlFromS3(voiceFileId: Long, userDbId: Long): String? {
        val s3Key = if (voiceFileId == 0L) {
            "audio/tutorial.mp3"
        } else {
            val voiceFile = voiceFileRepository.findByIdOrNull(voiceFileId)

            if (voiceFile == null || voiceFile.receiverId != userDbId) {
                return null
            }
            voiceFile.s3Key
        }

        // JAVA,Kotlin,S3もUTCで処理(有効期限は取得時より60分)
        val expiredAt = Date.from(Instant.now().plus(60, ChronoUnit.MINUTES))

        try {
            val url = amazonS3.generatePresignedUrl(bucketName, s3Key, expiredAt)
            return url.toString()
        } catch (e: AmazonServiceException) {
            println("failed to download audio file(AmazonServiceException): ${e.message}")
            return ""
        } catch (e: SdkClientException) {
            println("failed to download audio file(SdkClientException): ${e.message}")
            return ""
        }
    }

    fun putVoiceForS3(request: VoiceFileRequest): Result<Unit> {
        // create s3_key
        val s3Key = "audio/${UUID.randomUUID()}.mp3"
        val file = request.file

        return runCatching {
            amazonS3.putObject(
                PutObjectRequest(bucketName, s3Key, file.inputStream, ObjectMetadata().apply {
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

    fun postCount(userDbId: Long): Long {
        val todayStart = Instant.now().truncatedTo(ChronoUnit.DAYS)
        val todayEnd = todayStart.plus(1, ChronoUnit.DAYS)
        val voiceFiles = voiceFileRepository.findBySenderId(userDbId)
        if (voiceFiles != null) {
            val result = voiceFiles.filter {
                it.sentAt!!.isAfter(todayStart) && it.sentAt!!.isBefore(todayEnd)
            }
            return result.size.toLong()
        } else {
            return 0L
        }
    }

    fun upadtePlayHistory(userDbId: Long, voiceFileId: Long): String {
        val voiceFile = voiceFileRepository.findByIdOrNull(voiceFileId)
        if (voiceFile != null && voiceFile.receiverId == userDbId) {
            if (voiceFile.firstPlayedAt != null) {
                return "ALREADY_EXISTS"
            }
            try {
                voiceFile.firstPlayedAt = Instant.now()
                voiceFileRepository.save(voiceFile)
                return "SUCCESS"
            } catch (e: Exception) {
                return "ERROR"
            }
        } else {
            return "NOT_FOUND"
        }
    }

    fun getVoiceDataListForMine(userDbId: Long): List<VoiceFileResponse> {
        val voiceFiles = voiceFileRepository.findByReceiverId(userDbId)
        if (voiceFiles == null) {
            return emptyList()
        }
        val threshold = Instant.now().minus(72, ChronoUnit.HOURS)
        val updateVoiceFile = voiceFiles.map { voiceFile ->
            voiceFile.firstPlayedAt?.let { firstPlayedAt ->
                if (firstPlayedAt.isBefore(threshold)) {
                    voiceFile.playFlag = false
                    voiceFileRepository.save(voiceFile)
                }
            }
            val findUser = userService.searchUsersByDbID(voiceFile.senderId)
            VoiceFileResponse(
                id = voiceFile.id,
                sender_id = voiceFile.senderId,
                displayname = findUser!!.displayname,
                sent_at = voiceFile.sentAt,
                first_played_at = voiceFile.firstPlayedAt,
                play_flag = voiceFile.playFlag,
            )
        }
        return updateVoiceFile
    }

    fun tutorial(sender_id: Long, receiver_id: Long){
        val s3Key = "audio/tutorial.mp3"
        val voice = VoiceFile(
            senderId = sender_id,
            receiverId = receiver_id,
            fileName = "tutorial.mp3",
            s3Key = s3Key,
            firstPlayedAt = null,
            playFlag = true
        )
        voiceFileRepository.save(voice)
    }
}
