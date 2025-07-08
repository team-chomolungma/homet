package com.example.homet.controller

import com.example.homet.dto.LoginRequest
import com.example.homet.dto.LoginResponse
import com.example.homet.dto.SessionData
import com.example.homet.dto.SessionResponse
import com.example.homet.dto.SignupRequest
import com.example.homet.dto.SignupResponse
import com.example.homet.entity.Session
import com.example.homet.service.AuthService
import com.example.homet.service.PlayerService
import com.example.homet.service.SessionService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Duration
import java.time.Instant

@RestController
@RequestMapping("/api/auth")
data class AuthController(
    private val authService: AuthService,
    private val sessionService: SessionService,
) {
    val profile = System.getenv("SPRING_PROFILES_ACTIVE")
    val isLocal = profile == "development"

    fun setCookie(session: SessionData): ResponseCookie {
        val maxAge = Duration.between(Instant.now(), session.expireAt).seconds
        val cookie = ResponseCookie.from("SESSION_TOKEN", session.token)
            .httpOnly(true)
            .secure(!isLocal)
            .sameSite("Lax")
            .maxAge(maxAge)
            .path("/")
            .build()
        return cookie
    }

    fun delCookie(): ResponseCookie {
        val cookie = ResponseCookie.from("SESSION_TOKEN", "")
            .httpOnly(true)
            .secure(!isLocal)
            .sameSite("Lax")
            .maxAge(0)
            .path("/")
            .build()
        return cookie
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<LoginResponse> {
        val result = authService.login(request)
        if (result != null) {
            val session = sessionService.createSession(result.userID)
            val cookie = setCookie(session)
            return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body(result)
        } else {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }

    @PostMapping("/signup")
    fun signup(@RequestBody request: SignupRequest): ResponseEntity<SignupResponse> {
        val result = authService.signup(request)
        if (result != null) {
            val session = sessionService.createSession(result.userID)
            val cookie = setCookie(session)
            return ResponseEntity.status(HttpStatus.CREATED)
                .header("Set-Cookie", cookie.toString())
                .body(result)
        } else {
            return ResponseEntity(HttpStatus.CONFLICT)
        }
    }

    @PostMapping("/logout")
    fun logout(@CookieValue(name = "SESSION_TOKEN") token: String?): ResponseEntity<Any> {
        if (token == null) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val result = authService.logout(token)
        if (result.isSuccess) {
            val cookie = delCookie()
            return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .build()
        } else {
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @GetMapping("/session")
    fun validateSession(@CookieValue(name = "SESSION_TOKEN") token: String?): ResponseEntity<SessionResponse> {
        if (token == null) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val result = sessionService.isValidSession(token)
        if (result) {
            val finduser = sessionService.getUserFromSession(token)
            return ResponseEntity.ok().body(finduser)
        } else {
            val cookie = delCookie()
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .header("Set-Cookie", cookie.toString())
                .build()
        }
    }
}
