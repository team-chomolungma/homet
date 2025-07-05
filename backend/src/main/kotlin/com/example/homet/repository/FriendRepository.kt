package com.example.homet.repository

import com.example.homet.dto.FriendDto
import com.example.homet.entity.Friend
import org.springframework.data.jpa.repository.JpaRepository

interface FriendRepository: JpaRepository<Friend, Long> {
    fun findAllByUserDbId(user_id: Long): List<Friend>
    fun existsByUserDbIdAndFriendDbIdAndApprovedTrue(userDbId: Long, friendDbId: Long): Boolean
}