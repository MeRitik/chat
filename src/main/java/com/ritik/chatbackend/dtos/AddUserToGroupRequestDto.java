package com.ritik.chatbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddUserToGroupRequestDto {
    private String username;
    private String groupName;
}
