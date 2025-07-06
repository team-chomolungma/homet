package com.example.homet.repository

import com.example.homet.entity.VoiceFile
import org.springframework.data.jpa.repository.JpaRepository

interface VoiceFileRepository: JpaRepository<VoiceFile, Long> {
    fun findBySenderId(sender_id: Long): List<VoiceFile>?
}