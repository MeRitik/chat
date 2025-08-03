package com.ritik.chatbackend.dtos;

import lombok.Data;

import java.time.Instant;

@Data
public class MessageDto {
    private GroupUserDto sender;
    private String message;
    private Instant timestamp;
}
