package com.ritik.chatbackend.controllers;

import com.ritik.chatbackend.dtos.*;
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

    private final GroupService groupService;

    @PostMapping("user/{username}/group")
    public ResponseEntity<GroupDto> createGroup(@PathVariable String username, @RequestBody CreateGroupRequest request) {
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
}
