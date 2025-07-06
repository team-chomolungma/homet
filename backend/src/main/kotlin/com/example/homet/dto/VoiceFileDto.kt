package com.example.homet.dto

import org.springframework.web.multipart.MultipartFile
import java.time.Instant

data class VoiceFileRequest(
    val file: MultipartFile,
    val sender_id: Long,
    val receiver_id: Long,
)

data class VoiceFileIdRequest(
    val voice_file_id: Long,
)

data class VoiceFileResponse(
    val id: Long,
    val sender_id: Long,
    val diplayname: String,
    val sent_at: Instant?,
    val first_played_at: Instant?,
    val play_flag: Boolean,
    )