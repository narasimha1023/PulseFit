package com.pulsefit.attendance.client;

import com.pulsefit.attendance.client.dto.MemberClientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * OpenFeign Client connecting Attendance Service to Member Service via Eureka Discovery.
 * Target Eureka Service Name: pulsefit-member-service
 */
@FeignClient(name = "pulsefit-member-service")
public interface MemberClient {

    @GetMapping("/members/{id}")
    MemberClientDto getMemberById(@PathVariable("id") Long id);
}
