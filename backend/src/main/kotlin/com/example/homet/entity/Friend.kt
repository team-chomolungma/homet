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
@Table(
    name = "friends",
    uniqueConstraints = [UniqueConstraint(columnNames = ["user_id","friend_id"])]
)
@EntityListeners(AuditingEntityListener::class)
data class Friend(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,


    @Column(name = "user_id", nullable = false)
    val userDbId: Long,

    @Column(name = "friend_id", nullable = false)
    val friendDbId: Long,

    @Column(nullable = false)
    val approved: Boolean = false,

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    var createdAt: Instant? = null
)
