package com.pulsefit.gateway.filter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;

import static org.junit.jupiter.api.Assertions.*;

class RouteValidatorTest {

    private RouteValidator routeValidator;

    @BeforeEach
    void setUp() {
        routeValidator = new RouteValidator();
    }

    @Test
    @DisplayName("Public auth endpoints should not be secured")
    void openEndpoints_ShouldNotBeSecured() {
        MockServerHttpRequest registerReq = MockServerHttpRequest.post("/auth/register").build();
        MockServerHttpRequest loginReq = MockServerHttpRequest.post("/auth/login").build();
        MockServerHttpRequest validateReq = MockServerHttpRequest.get("/auth/validate?token=xyz").build();

        assertFalse(routeValidator.isSecured.test(registerReq));
        assertFalse(routeValidator.isSecured.test(loginReq));
        assertFalse(routeValidator.isSecured.test(validateReq));
    }

    @Test
    @DisplayName("Business microservice endpoints should be secured with JWT")
    void businessEndpoints_ShouldBeSecured() {
        MockServerHttpRequest membersReq = MockServerHttpRequest.get("/members").build();
        MockServerHttpRequest plansReq = MockServerHttpRequest.get("/plans").build();
        MockServerHttpRequest subsReq = MockServerHttpRequest.post("/subscriptions").build();
        MockServerHttpRequest attendanceReq = MockServerHttpRequest.post("/attendance/checkin").build();

        assertTrue(routeValidator.isSecured.test(membersReq));
        assertTrue(routeValidator.isSecured.test(plansReq));
        assertTrue(routeValidator.isSecured.test(subsReq));
        assertTrue(routeValidator.isSecured.test(attendanceReq));
    }
}
