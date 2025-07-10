package com.example.homet.service

import com.example.homet.dto.LoginRequest
import com.example.homet.dto.LoginResponse
import com.example.homet.dto.PlayerRequest
import com.example.homet.dto.SignupRequest
import com.example.homet.dto.SignupResponse
import com.example.homet.entity.Player
import com.example.homet.entity.Session
import com.example.homet.entity.User
import com.example.homet.repository.SessionRepository
import com.example.homet.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.UUID

@Service
data class AuthService(
    private val userRepository: UserRepository,
    private val playerService: PlayerService,
    private val sessionRepository: SessionRepository,
    private val friendService: FriendService,
    private val userService: UserService,
    private val voiceFileService: VoiceFileService,
) {
    fun login(request: LoginRequest): LoginResponse? {
        val encoder = BCryptPasswordEncoder()
        val findUser = userRepository.findByUserId(request.userID)
        val hashedPassword = findUser?.passwordHash
        val isValid = encoder.matches(request.password, hashedPassword)
        if (isValid && findUser != null) {
            return LoginResponse(
                userID = findUser.userId,
                displayname = findUser.displayname
            )
        }
        return null
    }

    fun signup(request: SignupRequest): SignupResponse? {
        val encoder = BCryptPasswordEncoder()
        val hashedPassword = encoder.encode(request.password)
        val findUser = userRepository.findByUserId(request.userID)
        if (findUser == null) {
            val signup = User(
                userId = request.userID,
                displayname = request.displayname,
                passwordHash = hashedPassword,
            )
            val result = userRepository.save(signup)
            val registerResult = playerService.register(PlayerRequest(request.userID, request.playerID))
            if(registerResult.isFailure){ return null }

            // ホメラニアンから受信
            val home = userService.homeSearch("homeranian")
            friendService.createFriend(result.id,home.id)
            friendService.createFriend(home.id, result.id)
            voiceFileService.tutorial(home.id,result.id)
            return SignupResponse(
                userID = request.userID,
                displayname = request.displayname,
            )
        }
        return null
    }

    fun logout(token: String):Result<Unit> {
        val session = sessionRepository.findByToken(token)
        return runCatching {
            sessionRepository.delete(session!!)
        }
    }

}