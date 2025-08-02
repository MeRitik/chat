package com.ritik.chatbackend.controllers;

import com.ritik.chatbackend.dtos.ProfileResponse;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.services.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final AppUserService userService;

    @GetMapping("/{username}")
    public ProfileResponse getProfile(@PathVariable String username) {
        AppUser user = userService.findByUsername(username);

        return ProfileResponse.builder()
                .name(user.getName())
                .username(user.getName())
                .totalChats(user.getGroups().size())
                .status("Active")
                .build();
    }
}
