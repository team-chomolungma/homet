package com.example.homet.controller

import com.example.homet.dto.VoiceFileRequest
import com.example.homet.entity.VoiceFile
import com.example.homet.service.PlayerService
import com.example.homet.service.SessionService
import com.example.homet.service.VoiceFileService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import kotlin.collections.mapOf

@RestController
@RequestMapping("/api/homet")
data class VoiceFileController(
    private val voiceFileService: VoiceFileService,
    private val playerService: PlayerService,
    private val sessionService: SessionService
){
    @GetMapping("/voice-data/{voice-file-id}")
    fun getVoiceFileData(
        @PathVariable("voice-file-id") voiceFileId: Long,
        @CookieValue("SESSION_TOKEN") token: String
    ): ResponseEntity<Any> {
        val myId = sessionService.getUser(token).id
        val result = voiceFileService.getUrlFromS3(voiceFileId,myId)
        return when {
            result == null -> ResponseEntity(HttpStatus.NOT_FOUND)
            result.isBlank() -> ResponseEntity(HttpStatus.SERVICE_UNAVAILABLE)
            else -> ResponseEntity.ok().body(mapOf("url" to result))
        }
    }

    @PostMapping("/voice")
    fun postVoiceFile(
        @RequestParam("file") file: MultipartFile,
        @RequestParam("sender_id") senderId: Long,
        @RequestParam("receiver_id") receiverId: Long,
    ): ResponseEntity<Any> {
        val request = VoiceFileRequest(
            file = file,
            sender_id = senderId,
            receiver_id = receiverId
        )
        val playerId = playerService.getPlayer(request.receiver_id)
        if(playerId == null) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }

        val result = voiceFileService.putVoiceForS3(request)
        if(result.isSuccess){
            return ResponseEntity.ok().body(mapOf("playerID" to playerId))
        }else{
            return ResponseEntity(HttpStatus.SERVICE_UNAVAILABLE)
        }
    }
}
