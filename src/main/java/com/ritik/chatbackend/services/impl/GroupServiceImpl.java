package com.ritik.chatbackend.services.impl;

import com.ritik.chatbackend.dtos.AddUserToGroupRequestDto;
import com.ritik.chatbackend.dtos.AddUserToGroupResponseDto;
import com.ritik.chatbackend.dtos.CreateGroupRequest;
import com.ritik.chatbackend.dtos.CreateGroupResponseDto;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.entities.Group;
import com.ritik.chatbackend.exceptions.ResourceNotFoundException;
import com.ritik.chatbackend.exceptions.UserAlreadyInGroupException;
import com.ritik.chatbackend.repositories.AppUserRepository;
import com.ritik.chatbackend.repositories.GroupRepository;
import com.ritik.chatbackend.services.GroupService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
@AllArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final AppUserRepository userRepository;

    @Override
    public AddUserToGroupResponseDto addUserToGroup(AddUserToGroupRequestDto requestDto) {
        Group group = groupRepository.findByName(requestDto.getGroupName()).orElseThrow(() -> new ResourceNotFoundException("Group", requestDto.getGroupName()));
        AppUser user = userRepository.findByUsername(requestDto.getUsername()).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if(group.getParticipants().contains(user) || user.getGroups().contains(group)) {
            throw new UserAlreadyInGroupException("User already in group " + requestDto.getGroupName() + " or group already contains " + requestDto.getUsername());
        }

        group.getParticipants().add(user);
        user.getGroups().add(group);
        groupRepository.save(group);
        userRepository.save(user);

        return new AddUserToGroupResponseDto(user.getUsername(), group.getName(), Instant.now(), true);
    }

    @Override
    public CreateGroupResponseDto createGroup(String username, CreateGroupRequest request) {
        if(request.getName() == null || request.getName().isBlank() || isGroupExists(request.getName())) {
            throw new IllegalArgumentException("Group name already exists");
        }

        Group group = new Group();
        AppUser user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        group.getParticipants().add(user);
        group.setName(request.getName());
        Group saved = groupRepository.save(group);
        user.getGroups().add(saved);
        userRepository.save(user);

        return new CreateGroupResponseDto(saved.getName());
    }

    @Override
    public boolean isGroupExists(String groupName) {
        return groupRepository.existsByName(groupName);
    }

    @Override
    public Group getGroupByName(String groupName) {
        return groupRepository.findByName(groupName).orElseThrow(() -> new IllegalArgumentException("Group not found"));
    }
}
