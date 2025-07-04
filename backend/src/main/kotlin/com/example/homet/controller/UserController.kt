package com.example.homet.controller

import com.example.homet.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {
    @GetMapping("/search")
    fun seachUser(
        @RequestParam userID: String
    ): ResponseEntity<Map<String,List<Map<String,Any>?>>> {
        val result = userService.searchUsers(userID)
        val data = if(result != null) listOf(result) else emptyList()
        return ResponseEntity.ok().body(mapOf("result" to data))
    }
}