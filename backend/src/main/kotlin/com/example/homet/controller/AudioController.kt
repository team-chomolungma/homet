package com.example.homet.controller

import com.example.homet.repository.AudioFileRepository
import com.example.homet.service.AudioService
import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


@RestController
@RequestMapping("/api")
class AudioController(private val audioService: AudioService) {
    @PostMapping("/upload", produces = ["application/json"])
    //audioをfileという変数で受け取る
    fun uploadAudio(@RequestParam("audio") file: MultipartFile): ResponseEntity<Map<String, Any>> {
        val id = audioService.handleUpload(file)
        return ResponseEntity.ok(mapOf("id" to id))
    }
}