package com.example.homet.controller

import com.example.homet.dto.FriendDto
import com.example.homet.dto.FriendRequest
import com.example.homet.repository.UserRepository
import com.example.homet.service.FriendService
import com.example.homet.service.SessionService
import com.example.homet.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestAttribute
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/api/friend"])
data class FriendController(
    private val friendService: FriendService,
    private val sessionService: SessionService,
    private val userService: UserService
){
    @GetMapping
    fun getFriends(
//        @CookieValue(name="SESSION_TOKEN") token: String,
        @RequestAttribute("SESSION_TOKEN") token: String,
    ): ResponseEntity<Map<String, List<FriendDto>>> {
        val user = sessionService.getUser(token)
        val result = friendService.getFriends(user.id)
        return ResponseEntity.ok().body(mapOf("result" to result))
    }

    @PostMapping
    fun createFriend(
//        @CookieValue(name="SESSION_TOKEN") token: String,
        @RequestAttribute("SESSION_TOKEN") token: String,
        @RequestBody request: FriendRequest,
    ): ResponseEntity<Any>{
        val myId = sessionService.getUser(token).id
        val result = friendService.createFriend(myId,request.id)
        if(result.isSuccess){
            return ResponseEntity(HttpStatus.CREATED)
        }else{
            return ResponseEntity(HttpStatus.CONFLICT)
        }

    }
}
