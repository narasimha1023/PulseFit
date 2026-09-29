package com.pulsefit.subscription;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * PulseFit Health Clubs (PS023)
 * Subscription and Membership Plans Microservice
 * Port: 8082
 * Database: pulsefit_subscription_db
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class SubscriptionServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubscriptionServiceApplication.class, args);
    }
}
