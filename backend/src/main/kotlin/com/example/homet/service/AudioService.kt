package com.example.homet.service

import com.example.homet.entity.AudioFile
import com.example.homet.repository.AudioFileRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.time.Instant
import java.util.*

@Service
class AudioService(
    private val audioFileRepository: AudioFileRepository
) {
    fun handleUpload(file: MultipartFile): Long {
        // S3キーを作る
        val s3Key = "audio/${UUID.randomUUID()}.mp3"

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
            username = "testuser", // 仮のユーザー
            createdAt = Instant.now(),
        )

        val saved = audioFileRepository.save(audio)
        return saved.id
    }
}
