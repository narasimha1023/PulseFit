package com.pulsefit.attendance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * PulseFit Health Clubs (PS023)
 * Attendance Tracking Microservice
 * Port: 8083
 * Database: pulsefit_attendance_db
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AttendanceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AttendanceServiceApplication.class, args);
    }
}
