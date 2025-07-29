package com.ritik.chatbackend.services.impl;

import com.ritik.chatbackend.dtos.CreateGroupRequest;
import com.ritik.chatbackend.dtos.GroupDto;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.entities.Group;
import com.ritik.chatbackend.repositories.AppUserRepository;
import com.ritik.chatbackend.repositories.GroupRepository;
import com.ritik.chatbackend.services.GroupService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final AppUserRepository userRepository;

    @Override
    public GroupDto createGroup(String username, CreateGroupRequest request) {
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

        return new GroupDto(saved.getName());
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
