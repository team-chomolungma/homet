package com.example.homet.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EntityListeners
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener::class)
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name="user_id",nullable = false, length = 100, unique = true)
    val userId: String,

    @Column(nullable = false, length = 100)
    val displayname: String,

    @Column(name="password_hash" ,nullable = false, length = 255)
    val passwordHash: String,

    @CreatedDate
    @Column(name="created_at", updatable = false)
    var createdAt: Instant? = null,
)
