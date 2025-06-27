package com.example.homet.controller

import com.example.homet.entity.AudioFile
import com.example.homet.repository.AudioFileRepository
import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.*
import java.nio.file.Files

@RestController
@RequestMapping("/api")
class `AudioController.kt`(private val audioFileRepository: AudioFileRepository) {

    @PostMapping("/upload", produces = ["application/json"])
    //audioをfileという変数で受け取る
    fun uploadAudio(@RequestParam("audio") file: MultipartFile): ResponseEntity<Map<String, Any>> {
        // フロントから来たファイルを一時ファイルに保存
        val inputFile = File.createTempFile("audio_input", ".webm") // iOSは".m4a"
        file.transferTo(inputFile)


        // 保存したいmp3ファイル　保存先の用意まだ空
        val outputFile = File.createTempFile("audio_output", ".mp3")
        println("🔧 出力ファイルパス: ${outputFile.absolutePath}")


        //変換されたmp3を読み込む　outputFileに入っている.mp3
        //バイナリにする
        val mp3Data = Files.readAllBytes(outputFile.toPath())
        println("📦 mp3 読み込み成功。サイズ: ${mp3Data.size} bytes")

        val audio = AudioFile(
            originalFilename = file.originalFilename ?: "audio",
            contentType = "audio/mpeg",//バイナリ送れる
            data = mp3Data
        )

        val saved = audioFileRepository.save(audio)
        println("アップロード完了: id = ${saved.id}")
        //レスポンスはjson
        return ResponseEntity.ok(mapOf("id" to saved.id))
    }

    @GetMapping("/audio/{id}")
    fun getAudio(@PathVariable id: Long): ResponseEntity<ByteArray> {
        val audio = audioFileRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(audio.contentType))
            .body(audio.data)
    }
}