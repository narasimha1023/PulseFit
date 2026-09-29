package com.pulsefit.auth.service;

import com.pulsefit.auth.dto.AuthResponseDto;
import com.pulsefit.auth.dto.LoginRequestDto;
import com.pulsefit.auth.dto.RegisterRequestDto;

public interface AuthService {

    AuthResponseDto register(RegisterRequestDto requestDto);

    AuthResponseDto login(LoginRequestDto requestDto);

    boolean validateToken(String token);
}
