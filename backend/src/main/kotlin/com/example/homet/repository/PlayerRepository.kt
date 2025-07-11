package com.example.homet.repository

import com.example.homet.entity.Player
import org.springframework.data.jpa.repository.JpaRepository

interface PlayerRepository: JpaRepository<Player, Long> {
}