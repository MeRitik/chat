package com.ritik.chatbackend.services.impl;

import com.ritik.chatbackend.dtos.CreateUserRequest;
import com.ritik.chatbackend.dtos.CreateUserResponse;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.repositories.AppUserRepository;
import com.ritik.chatbackend.services.AppUserService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserServicesImpl implements AppUserService {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public CreateUserResponse registerUser(CreateUserRequest request) {
        boolean alreadyExists = userRepository.findByUsername(request.getUsername()).isPresent();
        if (alreadyExists) {
            throw new IllegalArgumentException("Username already exists");
        }

        AppUser user = AppUser.builder()
                .name(request.getName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        AppUser saved = userRepository.save(user);
        return new CreateUserResponse(saved.getName(), saved.getUsername(), HttpStatus.CREATED.value());
    }

    @Override
    public AppUser findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
