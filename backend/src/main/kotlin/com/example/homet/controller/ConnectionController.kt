package com.example.homet.controller

import com.example.homet.dto.Connection
import com.example.homet.service.ConnectionService
import com.example.homet.service.SessionService
import com.example.homet.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/connection")
data class ConnectionController(
    private val connectionService: ConnectionService,
    private val sessionService: SessionService,
){
    @GetMapping
    fun getConnection(
        @CookieValue(name = "SESSION_TOKEN") token: String,
    ): ResponseEntity<Map<String,List<Connection>>> {
        val myId = sessionService.getUser(token).id
        val result = connectionService.getConnections(myId)
        return ResponseEntity.ok().body(mapOf("result" to result))
    }
}
