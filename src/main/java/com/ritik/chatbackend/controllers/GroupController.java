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

//    @GetMapping("/groups")
//    public ResponseEntity<Set<GroupDto>> getGroups(@RequestParam String username) {
//        System.out.println(username);
//
//        AppUser user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", username));
//        Set<Group> groups = user.getGroups();
//        Set<GroupDto> groupDtos = new HashSet<>();
//
//        for (Group group : groups) {
//            Set<GroupUserDto> groupUserDtos = new HashSet<>();
//            for (AppUser participant : group.getParticipants()) {
//                GroupUserDto groupUser = new GroupUserDto(participant.getName(), participant.getUsername());
//                groupUserDtos.add(groupUser);
//            }
//
//            List<MessageDto> messages = new ArrayList<>();
//            for(Message message : group.getMessages()) {
//                MessageDto messageDto = new MessageDto();
//                messageDto.setMessage(message.getMessage());
//                messageDto.setSender(new GroupUserDto(message.getSender().getName(), message.getSender().getUsername()));
//                messages.add(messageDto);
//            }
//
//
//            GroupDto groupDto = GroupDto.builder()
//                    .id(group.getId())
//                    .type(group.getParticipants().size() > 2 ? "group" : "direct")
//                    .name(group.getName())
//                    .participants(groupUserDtos)
//                    .messages(messages)
//                    .lastMessage(!messages.isEmpty() ? messages.getLast().getMessage() : null)
//                    .totalParticipants(group.getParticipants().size())
//                    .totalMessages(group.getMessages().size())
//                    .build();
//
//            groupDtos.add(groupDto);
//        }
//
//        groupDtos.forEach(System.out::println);
//
//        return ResponseEntity.ok(groupDtos);
//    }

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
