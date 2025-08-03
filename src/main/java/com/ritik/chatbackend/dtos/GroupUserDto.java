package com.ritik.chatbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GroupUserDto {
    public String name;
    public String username;
}
