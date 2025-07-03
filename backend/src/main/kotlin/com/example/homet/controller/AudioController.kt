//package com.example.homet.controller
//
//import com.example.homet.service.AudioService
//import org.springframework.http.*
//import org.springframework.web.bind.annotation.*
//import org.springframework.web.multipart.MultipartFile
//
//
//@RestController
//@RequestMapping("/api")
//class AudioController(private val audioService: AudioService) {
//
//    @PostMapping("/homet/voice")
//    //audioをfileという変数で受け取る
//    fun uploadAudio(
//        @RequestParam("audio") file: MultipartFile,
//        @RequestParam("senderUser") senderUser: String,
//        @RequestParam("receiverUser") receiverUser: String,
//    ): ResponseEntity<Map<String, Any>> {
//        val id = audioService.handleUpload(
//            file,
//            senderUser,
//            receiverUser
//        )
//        return ResponseEntity.ok(mapOf("id" to id))
//    }
//
//    @GetMapping("/homet/voice-data/{voice_file_id}")
//    fun getAudioUrl(
//        @PathVariable voice_file_id: Long,
//    ): ResponseEntity<Map<String, Any>> {
//        val url = audioService.getUrl(voice_file_id)
//        return ResponseEntity.ok(mapOf("url" to url))
//    }
//}