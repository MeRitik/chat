package com.ritik.chatbackend.dtos;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String name;
    private String username;
    private String password;
}
