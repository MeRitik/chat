package com.ritik.chatbackend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class MessageResponseDto {
    private CreateUserResponse sender;
    private CreateGroupResponseDto group;
    private String message;
    private Instant timestamp;
}
