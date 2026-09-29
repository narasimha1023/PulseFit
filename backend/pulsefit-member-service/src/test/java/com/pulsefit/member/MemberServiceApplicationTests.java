package com.pulsefit.member;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class MemberServiceApplicationTests {

    @Test
    void contextLoads() {
        // Validates that Spring context and JPA repositories boot cleanly
    }
}
