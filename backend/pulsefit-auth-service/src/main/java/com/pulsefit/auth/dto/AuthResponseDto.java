package com.pulsefit.auth.dto;

public class AuthResponseDto {

    private String token;
    private String username;
    private String role;
    private String email;

    public AuthResponseDto() {
    }

    public AuthResponseDto(String token, String username, String role, String email) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
