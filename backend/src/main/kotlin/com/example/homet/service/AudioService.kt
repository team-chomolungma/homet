package com.example.homet.service

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest

import com.example.homet.entity.AudioFile
import com.example.homet.repository.AudioFileRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.time.Instant
import java.util.*

@Service
class AudioService(
    private val audioFileRepository: AudioFileRepository,
    private val amazonS3: AmazonS3
) {

    fun handleUpload(file: MultipartFile, senderUser: String, receiverUser: String): Long {
        // S3キーを作る
        val s3Key = "audio/${UUID.randomUUID()}.mp3"

        //S3にアップロード　file.inputStreamアッロードするデータ
        amazonS3.putObject(
            PutObjectRequest("homet-audio-mp3", s3Key, file.inputStream, ObjectMetadata().apply {
                contentType = file.contentType ?: "audio/mp3"
                contentLength = file.size
            })
        )

        // frontend/public に保存　技術検証用
        val uploadDir = "/Users/user/Desktop/homet/frontend/public"
        val fileName = file.originalFilename
        val filePath = File("$uploadDir/$fileName")
        file.transferTo(filePath)

        // DB登録
        val audio = AudioFile(
            contentType = file.contentType ?: "unknown",
            filename = fileName ?: "",
            s3key = s3Key,
            sender_id = senderUser, // 仮のユーザー
            receiver_id = receiverUser,//仮
            createdAt = Instant.now(),
        )

        val saved = audioFileRepository.save(audio)
        return saved.id
    }

    fun getUrl(voiceFileId: Long): String {
        // DBから audio_file を1件取得
        val audioFile = audioFileRepository.findById(voiceFileId)
            .orElseThrow { IllegalArgumentException("Audio file not found") }

        // s3key を取得
        val s3Key = audioFile.s3key

        // 1時間有効
        val expiration = Date(System.currentTimeMillis() + 1000 * 60 * 60)
        // s3keyを元にS3探しに行く　署名付きURLを発行する
        val url = amazonS3.generatePresignedUrl("homet-audio-mp3", s3Key, expiration)

        return url.toString()
    }


}
