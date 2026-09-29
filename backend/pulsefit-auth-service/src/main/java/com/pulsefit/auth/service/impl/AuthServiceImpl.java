package com.pulsefit.auth.service.impl;

import com.pulsefit.auth.dto.AuthResponseDto;
import com.pulsefit.auth.dto.LoginRequestDto;
import com.pulsefit.auth.dto.RegisterRequestDto;
import com.pulsefit.auth.entity.User;
import com.pulsefit.auth.exception.InvalidCredentialsException;
import com.pulsefit.auth.exception.UserAlreadyExistsException;
import com.pulsefit.auth.repository.UserRepository;
import com.pulsefit.auth.security.JwtUtils;
import com.pulsefit.auth.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new UserAlreadyExistsException("Username '" + requestDto.getUsername() + "' is already taken");
        }

        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new UserAlreadyExistsException("Email '" + requestDto.getEmail() + "' is already registered");
        }

        String role = requestDto.getRole() != null && !requestDto.getRole().isBlank()
                ? requestDto.getRole().toUpperCase()
                : "USER";

        User user = new User();
        user.setUsername(requestDto.getUsername());
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setRole(role);

        User savedUser = userRepository.save(user);

        String token = jwtUtils.generateToken(savedUser.getUsername(), savedUser.getRole(), savedUser.getEmail());

        return new AuthResponseDto(token, savedUser.getUsername(), savedUser.getRole(), savedUser.getEmail());
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponseDto login(LoginRequestDto requestDto) {
        User user = userRepository.findByUsername(requestDto.getUsername())
                .or(() -> userRepository.findByEmail(requestDto.getUsername()))
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid username or password");
        }

        String token = jwtUtils.generateToken(user.getUsername(), user.getRole(), user.getEmail());

        return new AuthResponseDto(token, user.getUsername(), user.getRole(), user.getEmail());
    }

    @Override
    public boolean validateToken(String token) {
        return jwtUtils.validateToken(token);
    }
}
