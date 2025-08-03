package com.ritik.chatbackend.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class GroupDto {
    private Integer id;
    private String name;
    private String type;
    private Set<GroupUserDto> participants;
    private List<MessageDto> messages;
    private int totalParticipants;
    private int totalMessages;
    private String lastMessage;
    private String lastMessageTimestamp;
}
