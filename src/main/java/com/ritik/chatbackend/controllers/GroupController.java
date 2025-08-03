package com.ritik.chatbackend.controllers;

import com.ritik.chatbackend.dtos.*;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.entities.Group;
import com.ritik.chatbackend.entities.Message;
import com.ritik.chatbackend.exceptions.ResourceNotFoundException;
import com.ritik.chatbackend.repositories.AppUserRepository;
import com.ritik.chatbackend.services.GroupService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/api/v1/")
@AllArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final AppUserRepository userRepository;
    private final ModelMapper modelMapper;

    @PostMapping("user/{username}/group")
    public ResponseEntity<CreateGroupResponseDto> createGroup(@PathVariable String username, @RequestBody CreateGroupRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(groupService.createGroup(username, request));
    }

    @GetMapping("group/{groupName}/exists")
    public ResponseEntity<CheckGroupResponse> isGroupExists(@PathVariable String groupName) {
        var v = new CheckGroupResponse(groupName, groupService.isGroupExists(groupName));
        System.out.println(v);
        return ResponseEntity.ok(v);
    }

    @PostMapping("groups/user")
    public ResponseEntity<AddUserToGroupResponseDto> addUserToGroup(@RequestBody AddUserToGroupRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(groupService.addUserToGroup(request));
    }

    @GetMapping("/groups/{groupId}")
    public ResponseEntity<GroupDto> getGroup(@PathVariable Integer groupId, Model model) {
        Group group = groupService.getGroupById(groupId);

        Set<GroupUserDto> participantsListDto = new HashSet<>();
        List<MessageDto> messagesListDto = new ArrayList<>();

        for (AppUser user : group.getParticipants()) {
            participantsListDto.add(modelMapper.map(user, GroupUserDto.class));
        }

        for (Message message : group.getMessages()) {
            MessageDto messageDto = new MessageDto();
            messageDto.setSender(modelMapper.map(message.getSender(), GroupUserDto.class));
            messageDto.setMessage(message.getMessage());
            messageDto.setTimestamp(message.getTimestamp());

            messagesListDto.add(messageDto);
        }

        GroupDto groupDto = GroupDto.builder()
                .id(group.getId())
                .name(group.getName())
                .type(group.getParticipants().size() > 2 ? "group" : "direct")
                .totalParticipants(group.getParticipants().size())
                .totalMessages(group.getMessages().size())
                .lastMessage(group.getMessages().isEmpty() ? null : group.getMessages().getLast().getMessage())
                .lastMessageTimestamp(group.getMessages().isEmpty() ? null : group.getMessages().getLast().getTimestamp().toString())
                .participants(participantsListDto)
                .messages(messagesListDto)
                .build();

        return ResponseEntity.ok(groupDto);
    }

    @GetMapping("/groups")
    public ResponseEntity<List<GroupDataDto>> getGroups(@RequestParam String username) {
        System.out.println(username);
        Map<String, Object> response = new HashMap<>();
        AppUser user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", username));

        List<GroupDataDto> groupDataDtos = new ArrayList<>();
        Set<Group> groups = user.getGroups();
        for (Group group : groups) {
            GroupDataDto dto = new GroupDataDto();
            dto.setId(group.getId());
            dto.setName(group.getName());
            dto.setType(group.getParticipants().size() > 2 ? "group" : "direct");
            dto.setLastMessage(group.getMessages().isEmpty() ? null : group.getMessages().getLast().getMessage());
            dto.setLastMessageTime(group.getMessages().isEmpty() ? null : group.getMessages().getLast().getTimestamp().toString());

            groupDataDtos.add(dto);
        }

        return ResponseEntity.ok(groupDataDtos);
    }

}
