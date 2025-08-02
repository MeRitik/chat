package com.ritik.chatbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class AddUserToGroupDto {
    private String username;
    private String groupName;
    private Instant timestamp;
}
