package com.example.homet.dto

import org.springframework.web.multipart.MultipartFile

data class VoiceFileRequest(
    val file: MultipartFile,
    val sender_id: Long,
    val receiver_id: Long,
)
