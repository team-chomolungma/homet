package com.example.homet.controller

import com.example.homet.dto.GroupRequest
import com.example.homet.dto.GroupResponse
import com.example.homet.dto.LoginRequest
import com.example.homet.dto.MemberRequest
import com.example.homet.service.FriendService
import com.example.homet.service.GroupService
import com.example.homet.service.SessionService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/group")
data class GroupController(
    private val groupService: GroupService,
    private val sessionService: SessionService,
    private val friendService: FriendService
){

    fun filteredFriends(token:String,members:List<Long>):List<Long>{
        val myId = sessionService.getUser(token).id
        val friends = friendService.getFriends(myId)
        val friendIds = friends.map { it.id }.toSet()
        val filteredMembers = members.filter { it in friendIds }.toMutableSet()
        filteredMembers.add(myId)
        val finalMembers = filteredMembers.toList()
        return finalMembers
    }
    @PostMapping
    fun createGroup(
        @RequestBody request: GroupRequest,
        @CookieValue("SESSION_TOKEN") token: String
    ): ResponseEntity<GroupResponse> {
        val finalMembers = filteredFriends(token,request.memberID)
        val result = groupService.createGroup(request.groupname, finalMembers)
        return ResponseEntity.status(HttpStatus.CREATED).body(result)
    }

    @GetMapping
    fun getGroupList(
        @CookieValue("SESSION_TOKEN") token: String
    ):ResponseEntity<Map<String,List<GroupResponse>>>{
        val myId = sessionService.getUser(token).id
        val result = groupService.getGroupList(myId)
        return ResponseEntity.ok().body(mapOf("result" to result))
    }

    @PostMapping("/member")
    fun addMember(
        @RequestBody request: MemberRequest,
        @CookieValue("SESSION_TOKEN") token: String
    ):ResponseEntity<GroupResponse>{
        val finalMembers = filteredFriends(token,request.memberID)
        val result = groupService.addMember(request.groupID,finalMembers)
        if(result == null){
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result)
    }

    @DeleteMapping("/member")
    fun delMember(
        @RequestBody request: MemberRequest,
        @CookieValue("SESSION_TOKEN") token: String
    ):ResponseEntity<GroupResponse>{
        val myId = sessionService.getUser(token).id
        var finalMembers = filteredFriends(token,request.memberID)
        if(!request.memberID.contains(myId)){
            finalMembers = finalMembers.filterNot{it in listOf(myId) }
        }
        val result = groupService.deleteMember(request.groupID,finalMembers)
        if(result == null){
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity.status(HttpStatus.OK).body(result)
    }


}
