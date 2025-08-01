package com.ritik.chatbackend.security;

import com.ritik.chatbackend.dtos.LoginRequestDto;
import com.ritik.chatbackend.dtos.LoginResponseDto;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public LoginResponseDto login(LoginRequestDto request) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);

        AppUser user = (AppUser) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(user);

        return LoginResponseDto.builder()
                .token(jwt)
                .username(user.getUsername())
                .name(user.getName())
                .build();
    }
}
