package com.example.homet.entity

import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import java.time.Instant

@Entity
class AudioFile(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val filename: String,

    @Column(nullable = false)
    val username: String,

    @Column(nullable = false)
    val s3key: String,

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    var createdAt: Instant? = null,

    val contentType: String,

//    @Lob
//    val data: ByteArray
)
