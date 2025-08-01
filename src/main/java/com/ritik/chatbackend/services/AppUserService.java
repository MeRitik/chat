package com.ritik.chatbackend.services;

import com.ritik.chatbackend.dtos.CreateUserRequest;
import com.ritik.chatbackend.dtos.CreateUserResponse;
import com.ritik.chatbackend.entities.AppUser;

public interface AppUserService {
    CreateUserResponse registerUser(CreateUserRequest createUserRequest);
    AppUser findByUsername(String username);
}
