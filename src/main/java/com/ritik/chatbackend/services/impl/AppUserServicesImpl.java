package com.ritik.chatbackend.services.impl;

import com.ritik.chatbackend.dtos.CreateUserRequest;
import com.ritik.chatbackend.dtos.UserDto;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.repositories.AppUserRepository;
import com.ritik.chatbackend.services.AppUserServices;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserServicesImpl implements AppUserServices {

    private final AppUserRepository userRepository;

    @Override
    public UserDto registerUser(CreateUserRequest request) {
        boolean alreadyExists = userRepository.findByUsername(request.getUsername()).isPresent();
        if (alreadyExists) {
            throw new IllegalArgumentException("Username already exists");
        }

        AppUser user = AppUser.builder()
                .name(request.getName())
                .username(request.getUsername())
                .password(request.getPassword())
                .build();

        AppUser saved = userRepository.save(user);
        return new UserDto(saved.getName(), saved.getUsername());
    }

    @Override
    public AppUser findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
