package com.ritik.chatbackend.services;

import com.ritik.chatbackend.dtos.AddUserToGroupRequestDto;
import com.ritik.chatbackend.dtos.AddUserToGroupResponseDto;
import com.ritik.chatbackend.dtos.CreateGroupRequest;
import com.ritik.chatbackend.dtos.GroupDto;
import com.ritik.chatbackend.entities.Group;

public interface GroupService {
    GroupDto createGroup(String username, CreateGroupRequest request);
    boolean isGroupExists(String groupName);
    Group getGroupByName(String groupName);
    AddUserToGroupResponseDto addUserToGroup(AddUserToGroupRequestDto requestDto);
}
