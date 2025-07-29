package com.ritik.chatbackend.services;

import com.ritik.chatbackend.dtos.CreateUserRequest;
import com.ritik.chatbackend.dtos.UserDto;
import com.ritik.chatbackend.entities.AppUser;

public interface AppUserServices {
    UserDto registerUser(CreateUserRequest createUserRequest);
    AppUser findByUsername(String username);
}
