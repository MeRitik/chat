package com.ritik.chatbackend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class MessageResponseDto {
    private GroupUserDto sender;
    private CreateGroupResponseDto group;
    private String message;
    private Instant timestamp;

    @Override
    public String toString() {
        return "MessageResponseDto{" +
                "sender=" + sender.getUsername() +
                ", group=" + group.getName() +
                ", message='" + message + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
