package com.example.homet.entity

import jakarta.persistence.*

@Entity
class AudioFile(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val originalFilename: String,

    val contentType: String,

    @Lob
    val data: ByteArray
)