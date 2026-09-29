package com.pulsefit.auth.service;

import com.pulsefit.auth.dto.AuthResponseDto;
import com.pulsefit.auth.dto.LoginRequestDto;
import com.pulsefit.auth.dto.RegisterRequestDto;
import com.pulsefit.auth.entity.User;
import com.pulsefit.auth.exception.InvalidCredentialsException;
import com.pulsefit.auth.exception.UserAlreadyExistsException;
import com.pulsefit.auth.repository.UserRepository;
import com.pulsefit.auth.security.JwtUtils;
import com.pulsefit.auth.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = new User(1L, "narasimha", "narasimha@example.com", "encodedPassword123", "USER");
    }

    @Test
    @DisplayName("Should register new user successfully and return JWT token")
    void register_Success() {
        RegisterRequestDto requestDto = new RegisterRequestDto("narasimha", "narasimha@example.com", "password123", "USER");

        when(userRepository.existsByUsername("narasimha")).thenReturn(false);
        when(userRepository.existsByEmail("narasimha@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);
        when(jwtUtils.generateToken("narasimha", "USER", "narasimha@example.com")).thenReturn("mock.jwt.token");

        AuthResponseDto response = authService.register(requestDto);

        assertNotNull(response);
        assertEquals("mock.jwt.token", response.getToken());
        assertEquals("narasimha", response.getUsername());
        assertEquals("USER", response.getRole());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw UserAlreadyExistsException when username is taken")
    void register_DuplicateUsername_ThrowsException() {
        RegisterRequestDto requestDto = new RegisterRequestDto("narasimha", "different@example.com", "password123", "USER");

        when(userRepository.existsByUsername("narasimha")).thenReturn(true);

        assertThrows(UserAlreadyExistsException.class, () -> authService.register(requestDto));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw UserAlreadyExistsException when email is taken")
    void register_DuplicateEmail_ThrowsException() {
        RegisterRequestDto requestDto = new RegisterRequestDto("different", "narasimha@example.com", "password123", "USER");

        when(userRepository.existsByUsername("different")).thenReturn(false);
        when(userRepository.existsByEmail("narasimha@example.com")).thenReturn(true);

        assertThrows(UserAlreadyExistsException.class, () -> authService.register(requestDto));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Should login successfully with valid credentials and return JWT token")
    void login_Success() {
        LoginRequestDto requestDto = new LoginRequestDto("narasimha", "password123");

        when(userRepository.findByUsername("narasimha")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("password123", "encodedPassword123")).thenReturn(true);
        when(jwtUtils.generateToken("narasimha", "USER", "narasimha@example.com")).thenReturn("mock.jwt.token");

        AuthResponseDto response = authService.login(requestDto);

        assertNotNull(response);
        assertEquals("mock.jwt.token", response.getToken());
        assertEquals("narasimha", response.getUsername());
    }

    @Test
    @DisplayName("Should throw InvalidCredentialsException when password does not match")
    void login_InvalidPassword_ThrowsException() {
        LoginRequestDto requestDto = new LoginRequestDto("narasimha", "wrongPassword");

        when(userRepository.findByUsername("narasimha")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword123")).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> authService.login(requestDto));
    }

    @Test
    @DisplayName("Should throw InvalidCredentialsException when user not found")
    void login_UserNotFound_ThrowsException() {
        LoginRequestDto requestDto = new LoginRequestDto("unknownUser", "password123");

        when(userRepository.findByUsername("unknownUser")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("unknownUser")).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, () -> authService.login(requestDto));
    }
}
