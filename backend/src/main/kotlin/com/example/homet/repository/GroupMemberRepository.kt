package com.example.homet.repository

import com.example.homet.entity.Group
import com.example.homet.entity.GroupMember
import org.springframework.data.jpa.repository.JpaRepository

interface GroupMemberRepository: JpaRepository<GroupMember, Long> {
    fun findAllByGroupDbId(groupDbId: Long): List<GroupMember>
    fun existsByGroupDbIdAndUserDbId(groupDbId: Long, userDbId: Long): Boolean
    fun findByUserDbId(userDbId: Long): GroupMember?
    fun findAllByUserDbId(userDbId: Long): List<GroupMember>
    fun findByGroupDbIdAndUserDbId(groupDbId: Long, userDbId: Long): GroupMember?

}