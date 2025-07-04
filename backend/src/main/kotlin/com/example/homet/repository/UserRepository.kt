package com.example.homet.repository

import com.example.homet.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long> {
    fun findByUserId(userID: String): User?
}