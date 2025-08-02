package com.ritik.chatbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckGroupResponse {
    private String groupName;
    private boolean exists;
}
