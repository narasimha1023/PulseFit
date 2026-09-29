package com.pulsefit.gateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

/**
 * PulseFit Health Clubs (PS023)
 * Route Validator to determine secured vs open endpoints.
 */
@Component
public class RouteValidator {

    public static final List<String> OPEN_API_ENDPOINTS = List.of(
            "/auth/register",
            "/auth/login",
            "/auth/validate",
            "/eureka"
    );

    public Predicate<ServerHttpRequest> isSecured = request ->
            OPEN_API_ENDPOINTS.stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
