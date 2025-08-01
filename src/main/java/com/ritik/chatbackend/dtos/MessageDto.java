package com.ritik.chatbackend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class MessageDto {
    private CreateUserResponse sender;
    private GroupDto group;
    private String message;
    private Instant timestamp;
}
