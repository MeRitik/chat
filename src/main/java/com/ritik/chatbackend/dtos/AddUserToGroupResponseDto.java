package com.ritik.chatbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class AddUserToGroupResponseDto {
    private String username;
    private String groupName;
    private Instant timestamp;
    private boolean success;
}
