package com.pulsefit.auth.controller;

import com.pulsefit.auth.dto.AuthResponseDto;
import com.pulsefit.auth.dto.LoginRequestDto;
import com.pulsefit.auth.dto.RegisterRequestDto;
import com.pulsefit.auth.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Test endpoint
    @GetMapping("/")
    public String home() {
        return "Auth Service is Running";
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @Valid @RequestBody RegisterRequestDto requestDto) {

        AuthResponseDto response = authService.register(requestDto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @Valid @RequestBody LoginRequestDto requestDto) {

        AuthResponseDto response = authService.login(requestDto);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(
            @RequestParam("token") String token) {

        boolean isValid = authService.validateToken(token);

        return ResponseEntity.ok(Map.of(
                "valid", isValid,
                "token", token
        ));
    }
}