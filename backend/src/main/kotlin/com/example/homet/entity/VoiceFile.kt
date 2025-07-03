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
@Table(name = "voice_files")
@EntityListeners(AuditingEntityListener::class)
data class VoiceFile(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name="sender_id",nullable = false)
    val senderId: Long,

    @Column(name="receiver_id",nullable = false)
    val receiverId: Long,

    @Column(name="file_name" ,nullable = false, length = 255)
    val fileName: String,

    @Column(name="s3_key" ,nullable = false, length = 255)
    val s3Key: String,

    // 再生された初回日時。未再生ならnull
    @Column(name = "first_played_at")
    var firstPlayedAt: Instant? = null,


    @Column(name="play_flag",nullable = false)
    val playFlag: Boolean = true,

    @CreatedDate
    @Column(name="sent_at", updatable = false)
    val sentAt: Instant? = null,
)
