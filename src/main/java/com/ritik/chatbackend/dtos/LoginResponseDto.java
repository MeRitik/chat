package com.ritik.chatbackend.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LoginResponseDto {
    String token;
    String username;
    String name;
}
