package com.pulsefit.auth.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilsTest {

    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() {
        jwtUtils = new JwtUtils();
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 3600000L); // 1 hour
    }

    @Test
    @DisplayName("Should generate valid JWT token with claims")
    void generateAndValidateToken_Success() {
        String token = jwtUtils.generateToken("narasimha", "ADMIN", "narasimha@example.com");

        assertNotNull(token);
        assertTrue(jwtUtils.validateToken(token));
        assertEquals("narasimha", jwtUtils.getUsernameFromToken(token));
        assertEquals("ADMIN", jwtUtils.getRoleFromToken(token));
    }

    @Test
    @DisplayName("Should return false for invalid or tampered JWT token")
    void validateToken_InvalidToken_ReturnsFalse() {
        assertFalse(jwtUtils.validateToken("invalid.jwt.token"));
    }
}
