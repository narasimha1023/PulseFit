package com.pulsefit.subscription.service;

import com.pulsefit.subscription.dto.SubscriptionRequestDto;
import com.pulsefit.subscription.dto.SubscriptionResponseDto;

import java.util.List;

public interface SubscriptionService {

    SubscriptionResponseDto createSubscription(SubscriptionRequestDto requestDto);

    List<SubscriptionResponseDto> getAllSubscriptions();

    SubscriptionResponseDto getSubscriptionById(Long id);

    List<SubscriptionResponseDto> getSubscriptionsByMemberId(Long memberId);

    SubscriptionResponseDto renewSubscription(Long id);

    SubscriptionResponseDto cancelSubscription(Long id);
}
