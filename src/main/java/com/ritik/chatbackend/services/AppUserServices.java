package com.ritik.chatbackend.services;

import com.ritik.chatbackend.dtos.CreateUserRequest;
import com.ritik.chatbackend.dtos.UserDto;

public interface AppUserServices {
    UserDto registerUser(CreateUserRequest createUserRequest);
}
