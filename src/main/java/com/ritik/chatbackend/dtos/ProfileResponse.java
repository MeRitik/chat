package com.ritik.chatbackend.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProfileResponse {
    private String name;
    private String username;
    private int totalChats;
    private String status;
}
