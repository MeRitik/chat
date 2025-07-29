package com.ritik.chatbackend.services;

import com.ritik.chatbackend.dtos.CreateGroupRequest;
import com.ritik.chatbackend.dtos.GroupDto;

public interface GroupService {
    GroupDto createGroup(String username, CreateGroupRequest request);
    boolean isGroupExists(String groupName);
}
