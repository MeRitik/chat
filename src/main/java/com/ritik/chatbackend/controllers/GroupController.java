package com.ritik.chatbackend.controllers;

import com.ritik.chatbackend.dtos.CreateGroupRequest;
import com.ritik.chatbackend.dtos.GroupDto;
import com.ritik.chatbackend.services.GroupService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/")
@AllArgsConstructor
public class GroupController {

    private final GroupService groupRepository;

    @PostMapping("user/{username}/group")
    public ResponseEntity<GroupDto> createGroup(@PathVariable String username, @RequestBody CreateGroupRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(groupRepository.createGroup(username, request));
    }

    @GetMapping("group/{groupName}/exists")
    public ResponseEntity<Boolean> isGroupExists(@PathVariable String groupName) {
        return ResponseEntity.ok(groupRepository.isGroupExists(groupName));
    }
}
