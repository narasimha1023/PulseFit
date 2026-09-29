package com.pulsefit.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * PulseFit Health Clubs (PS023)
 * Member Management Microservice
 * Port: 8081
 * Database: pulsefit_member_db
 */
@SpringBootApplication
@EnableDiscoveryClient
public class MemberServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MemberServiceApplication.class, args);
    }
}
