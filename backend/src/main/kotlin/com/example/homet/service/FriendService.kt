package com.example.homet.service

import com.example.homet.dto.FriendDto
import com.example.homet.entity.Friend
import com.example.homet.repository.FriendRepository
import com.example.homet.repository.UserRepository
import org.springframework.stereotype.Service

@Service
data class FriendService(
    private val frinedRepository: FriendRepository,
    private val userRepository: UserRepository,
    private val userService: UserService,
    private val sessionService: SessionService
){
    fun getFriends(userDbId:Long):List<FriendDto> {
        val approvedFriends = frinedRepository.findAllByUserDbId(userDbId)
            .filter { it.approved }
            .filter { friend ->
                frinedRepository.existsByUserDbIdAndFriendDbIdAndApprovedTrue(friend.friendDbId, userDbId)
            }
        val friendsIdArray = approvedFriends.map { it.friendDbId }
        val friendUsers = userRepository.findAllById(friendsIdArray).associateBy { it.id }

        return approvedFriends.mapNotNull { friend ->
            val user = friendUsers[friend.friendDbId]
            user?.let { FriendDto(it.id, it.displayname) }
        }
    }
    fun createFriend(userDbId: Long, friendDbId: Long): Result<Unit> {
        val friend = Friend(
            userDbId=userDbId,
            friendDbId=friendDbId,
            approved=true,
        )
        return runCatching {
            frinedRepository.save(friend)
        }
    }
}
