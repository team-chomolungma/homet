package com.example.homet.repository

import com.example.homet.entity.GroupMember
import org.springframework.data.jpa.repository.JpaRepository

interface GroupMemberRepository: JpaRepository<GroupMember, Long> {
}