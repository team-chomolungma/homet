package com.example.homet.service

import com.example.homet.dto.GroupResponse
import com.example.homet.entity.Group
import com.example.homet.entity.GroupMember
import com.example.homet.repository.GroupMemberRepository
import com.example.homet.repository.GroupRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
data class GroupService(
    private val groupRepository: GroupRepository,
    private val groupMemberRepository: GroupMemberRepository,
    private val friendService: FriendService
){
    fun createGroup(groupname:String, memberID:List<Long>): GroupResponse {
        val savedGroup = groupRepository.save(Group(groupName = groupname))
        val groupId = savedGroup.id
        memberID.forEach {
            val groupMember = GroupMember(
                groupDbId = groupId,
                userDbId = it,
            )
            groupMemberRepository.save(groupMember)
        }
        val memberID = groupMemberRepository.findAllByGroupDbId(groupId).map { it.userDbId }
        return GroupResponse(
            groupID = groupId,
            groupname = groupname,
            memberID= memberID
        )
    }

    fun addMember(groupId:Long,memberID:List<Long>): GroupResponse? {
        val group = groupRepository.findByIdOrNull(groupId)
        if (group == null) {
            return null
        }
        memberID.forEach {
            val exits = groupMemberRepository.existsByGroupDbIdAndUserDbId(groupId, it)
            if(!exits) {
                val groupMember = GroupMember(
                    groupDbId = groupId,
                    userDbId = it,
                )
                groupMemberRepository.save(groupMember)
            }
        }
        val memberID = groupMemberRepository.findAllByGroupDbId(groupId).map { it.userDbId }
        return GroupResponse(
            groupID = groupId,
            groupname = group.groupName,
            memberID= memberID
        )
    }
    fun deleteMember(groupId:Long,memberID:List<Long>): GroupResponse? {
        val group = groupRepository.findByIdOrNull(groupId)
        if (group == null) {
            return null
        }
        memberID.forEach {
            val exits = groupMemberRepository.existsByGroupDbIdAndUserDbId(groupId, it)
            if(exits) {
                val groupMember = groupMemberRepository.findByGroupDbIdAndUserDbId(groupId,it)
                if(groupMember != null) {
                    groupMemberRepository.delete(groupMember)
                }
            }
        }
        val memberID = groupMemberRepository.findAllByGroupDbId(groupId).map { it.userDbId }
        return GroupResponse(
            groupID = groupId,
            groupname = group.groupName,
            memberID= memberID
        )
    }

    fun getGroupList(userDbId: Long):List<GroupResponse>{
        val myGroups = groupMemberRepository.findAllByUserDbId(userDbId)
        val groupList =  myGroups.mapNotNull {
            val group = groupRepository.findByIdOrNull(it.groupDbId)
            if(group != null) {
                val memberID = groupMemberRepository.findAllByGroupDbId(it.groupDbId).map { it.userDbId }
                GroupResponse(
                    groupID = it.groupDbId,
                    groupname = group.groupName,
                    memberID = memberID
                )
            }else{
                null
            }
        }
        return groupList
    }
}
