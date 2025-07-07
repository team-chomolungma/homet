package com.example.homet.repository

import com.example.homet.entity.Session
import org.springframework.data.jpa.repository.JpaRepository

interface SessionRepository: JpaRepository<Session, Long> {
    fun findByToken(token: String): Session?
}