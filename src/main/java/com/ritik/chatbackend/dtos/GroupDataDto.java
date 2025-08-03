package com.ritik.chatbackend.dtos;

import lombok.Data;

@Data
public class GroupDataDto {
    private Integer id;
    private String name;
    private String type;
    private String lastMessage;
    private String lastMessageTime;
}
