package com.example.homet.controller

import com.example.homet.service.VoiceFileService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/tutorial")
data class TutorialController(
    private val voiceFileService: VoiceFileService
){
    @GetMapping
    fun getTutorialVoice(): ResponseEntity<Any> {
        val result = voiceFileService.getUrlFromS3(0L)
        return when {
            result == null -> ResponseEntity(HttpStatus.NOT_FOUND)
            result.isBlank() -> ResponseEntity(HttpStatus.SERVICE_UNAVAILABLE)
            else -> ResponseEntity.ok().body(mapOf("url" to result))
        }
    }
}
