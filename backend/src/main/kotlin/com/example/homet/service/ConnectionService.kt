package com.example.homet.service

import com.example.homet.dto.Connection
import com.example.homet.repository.VoiceFileRepository
import org.springframework.stereotype.Service

@Service
data class ConnectionService(
    private val voiceFileService: VoiceFileService,
    private val friendService: FriendService
){
    fun getConnections(userDbId: Long): List<Connection> {
        val voiceFiles = voiceFileService.getVoiceAllFiles()
        val friends = friendService.getFriends(userDbId)
        val friendIds = friends.map { it.id }.toSet()

        val sentGrouped = voiceFiles
            .filter { it.senderId == userDbId }
            .groupBy { it.receiverId }
            .filterKeys { it in friendIds }

        val receivedGrouped = voiceFiles
            .filter { it.receiverId == userDbId }
            .groupBy { it.senderId }
            .filterKeys { it in friendIds }

        val result = friends.map { friend ->
            val sent = sentGrouped[friend.id].orEmpty()
            val received = receivedGrouped[friend.id].orEmpty()

            Connection(
                id = friend.id,
                displayname = friend.displayname,
                sent_count = sent.size.toLong(),
                received_count = received.size.toLong(),
                last_sent = sent
                    .filter { it.sentAt != null }
                    .maxByOrNull { it.sentAt!! }
                    ?.sentAt,
                last_received = received
                    .filter { it.sentAt != null}
                    .maxByOrNull { it.sentAt!! }
                    ?.sentAt,
            )
        }
        return result
    }
}
