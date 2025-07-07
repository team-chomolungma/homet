package com.example.homet.dto

import java.time.Instant

data class Connection(
    val id : Long,
    val displayname : String,
    val sent_count : Long,
    val received_count : Long,
    val last_sent: Instant?,
    val last_received: Instant?,
)
