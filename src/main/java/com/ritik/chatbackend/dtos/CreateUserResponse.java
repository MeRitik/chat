package com.ritik.chatbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateUserResponse {
    private String name;
    private String username;
    private int statusCode;
}
