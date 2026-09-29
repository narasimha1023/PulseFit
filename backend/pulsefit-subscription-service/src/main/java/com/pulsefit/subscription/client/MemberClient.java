package com.pulsefit.subscription.client;

import com.pulsefit.subscription.client.dto.MemberClientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * OpenFeign Client connecting Subscription Service to Member Service via Eureka Discovery.
 * Target: pulsefit-member-service / MEMBER-SERVICE
 */
@FeignClient(name = "pulsefit-member-service")
public interface MemberClient {

    @GetMapping("/members/{id}")
    MemberClientDto getMemberById(@PathVariable("id") Long id);
}
