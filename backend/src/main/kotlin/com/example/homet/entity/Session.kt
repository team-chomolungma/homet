package com.example.homet.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EntityListeners
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.persistence.UniqueConstraint
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant

@Entity
@Table(name = "sessions")
@EntityListeners(AuditingEntityListener::class)
data class Session(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,


    @Column(name = "user_id", nullable = false)
    val userDbId: Long,

    @Column(nullable = false , unique = true)
    val token: String,

    @Column(name = "expires_at", nullable = false)
    var expiresAt: Instant,

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    var createdAt: Instant? = null
)
