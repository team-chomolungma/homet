package com.example.homet.service

import com.example.homet.dto.LoginRequest
import com.example.homet.dto.PlayerRequest
import com.example.homet.dto.SignupRequest
import com.example.homet.dto.SignupResponse
import com.example.homet.entity.Player
import com.example.homet.repository.PlayerRepository
import com.example.homet.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
data class PlayerService(
    private val userRepository: UserRepository,
    private val playerRepository: PlayerRepository,
){
    fun register(request: PlayerRequest):Result<Unit> {
        val findUser = userRepository.findByUserId(request.userID)
        val player = Player(
            userDbId = findUser!!.id,
            playerId = request.playerID
        )
        return runCatching {
            playerRepository.save(player)
        }
    }
}
