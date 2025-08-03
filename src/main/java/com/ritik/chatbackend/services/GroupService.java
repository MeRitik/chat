package com.ritik.chatbackend.services;

import com.ritik.chatbackend.dtos.AddUserToGroupRequestDto;
import com.ritik.chatbackend.dtos.AddUserToGroupResponseDto;
import com.ritik.chatbackend.dtos.CreateGroupRequest;
import com.ritik.chatbackend.dtos.CreateGroupResponseDto;
import com.ritik.chatbackend.entities.Group;

public interface GroupService {
    CreateGroupResponseDto createGroup(String username, CreateGroupRequest request);
    boolean isGroupExists(String groupName);
    Group getGroupByName(String groupName);
    AddUserToGroupResponseDto addUserToGroup(AddUserToGroupRequestDto requestDto);

    Group getGroupById(Integer groupId);
}
