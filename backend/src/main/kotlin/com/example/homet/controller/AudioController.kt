package com.example.homet.controller

import com.example.homet.entity.AudioFile
import com.example.homet.repository.AudioFileRepository
import org.apache.catalina.startup.ExpandWar.deleteDir
import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.*
import java.nio.file.Files
import java.time.Instant
import java.util.UUID
import java.util.stream.DoubleStream.builder

@RestController
@RequestMapping("/api")
class AudioController(private val audioFileRepository: AudioFileRepository) {
    @PostMapping("/upload", produces = ["application/json"])
    //audioをfileという変数で受け取る
    fun uploadAudio(@RequestParam("audio") file: MultipartFile): ResponseEntity<Map<String, Any>> {
        println("🎧 ファイル名: ${file.originalFilename}")
        println("📦 コンテンツタイプ: ${file.contentType}")


        val s3Key = "audio/${UUID.randomUUID()}.mp3"


        //frontendのpublicフォルダに保存
        val uploadDir = "/Users/user/Desktop/homet/frontend/public"
        val fileName = file.originalFilename
        val filePath = File("$uploadDir/$fileName")
        //作る前に古いのを消す
//        val deleteFile = File("/Users/user/Desktop/homet/frontend/public/$fileName")
//        deleteFile.delete()
        //新しく作る
        file.transferTo(filePath)


        val audio = AudioFile(
            contentType = file.contentType ?: "unknown",
            filename = file.originalFilename ?: "",
            s3key = s3Key,
            username = "testuser",
            createdAt = Instant.now(),
        )

        val saved = audioFileRepository.save(audio)
        println("アップロード完了: id = ${saved.id}")
        //レスポンスはjson
        return ResponseEntity.ok(mapOf("id" to saved.id))


    }

}