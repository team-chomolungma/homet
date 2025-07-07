package com.example.homet.dto

data class GroupResponse(
    val groupID: Long,
    val groupname: String,
    val memberID: List<Long>,
)

data class GroupRequest(
    val groupname: String,
    val memberID: List<Long>,
)

data class MemberRequest(
    val groupID: Long,
    val memberID: List<Long>,
)