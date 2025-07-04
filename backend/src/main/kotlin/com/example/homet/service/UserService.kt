package com.example.homet.service

import com.example.homet.entity.User
import com.example.homet.repository.UserRepository
import org.springframework.stereotype.Service

@Service
data class UserService(
    private val userRepository: UserRepository
){
    fun searchUsers(userID: String): Map<String, Any>? {
        val findUser = userRepository.findByUserId(userID)
        if (findUser != null) {
            return mapOf(
                "id" to findUser.id,
                "userID" to findUser.userId,
                "displayname" to findUser.displayname,
            )
        }else{
            return null
        }
    }
}
