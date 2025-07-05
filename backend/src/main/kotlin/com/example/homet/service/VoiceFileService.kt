package com.example.homet.service

import com.example.homet.entity.VoiceFile
import com.example.homet.repository.VoiceFileRepository
import org.springframework.stereotype.Service

@Service
data class VoiceFileService(
    val voiceFileRepository: VoiceFileRepository
){
    fun getVoiceAllFiles(): List<VoiceFile>{
        return voiceFileRepository.findAll()
    }
}
