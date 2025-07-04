package com.example.homet.dto

import java.time.Instant

data class LoginResponse(
    val userID: String,
    val displayname: String
)

data class LoginRequest(
    val userID: String,
    val password: String
)

data class SessionData(
    val token: String,
    val expireAt: Instant
)

data class SessionResponse(
    val userID: String,
    val displayname: String
)

data class SignupRequest(
    val userID: String,
    val displayname: String,
    val password: String,
    val playerID: String
)

data class SignupResponse(
    val userID: String,
    val displayname: String
)