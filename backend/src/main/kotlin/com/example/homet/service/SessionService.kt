package com.example.homet.service

import com.example.homet.dto.GetUser
import com.example.homet.dto.LoginRequest
import com.example.homet.dto.LoginResponse
import com.example.homet.dto.SessionData
import com.example.homet.dto.SessionResponse
import com.example.homet.entity.Session
import com.example.homet.repository.SessionRepository
import com.example.homet.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.UUID

@Service
data class SessionService(
    private val userRepository: UserRepository,
    private val sessionRepository: SessionRepository,
){
    fun createSession(userID: String): SessionData{
        val findUser = userRepository.findByUserId(userID)
        val token = UUID.randomUUID().toString()
        val session = Session(
            userDbId = findUser!!.id,
            token = token,
            // とりあえずsessionの有効期限は2週間(14日間)で設定
            expiresAt = Instant.now().plus(14, ChronoUnit.DAYS),
        )
        sessionRepository.save(session)
        return SessionData(
            token = token,
            expireAt = session.expiresAt,
        )
    }
    fun isValidSession(token: String): Boolean {
        val isSession = sessionRepository.findByToken(token)
        return isSession != null
    }
    fun getUserFromSession(token: String): SessionResponse {
        val session = sessionRepository.findByToken(token)
        val findUser = userRepository.findByIdOrNull(session!!.userDbId)

        return SessionResponse(
            userID = findUser!!.userId,
            displayname = findUser.displayname
        )
    }

    fun getUser(token: String): GetUser {
        val session = sessionRepository.findByToken(token)
        val findUser = userRepository.findByIdOrNull(session!!.userDbId)

        return GetUser(
            id = findUser!!.id,
            userID = findUser.userId,
            displayname = findUser.displayname
        )
    }
}
