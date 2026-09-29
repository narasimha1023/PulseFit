package com.pulsefit.subscription.service.impl;

import com.pulsefit.subscription.client.MemberClient;
import com.pulsefit.subscription.client.dto.MemberClientDto;
import com.pulsefit.subscription.dto.SubscriptionRequestDto;
import com.pulsefit.subscription.dto.SubscriptionResponseDto;
import com.pulsefit.subscription.entity.MembershipPlan;
import com.pulsefit.subscription.entity.Subscription;
import com.pulsefit.subscription.exception.MemberNotFoundException;
import com.pulsefit.subscription.exception.PlanNotFoundException;
import com.pulsefit.subscription.exception.SubscriptionNotFoundException;
import com.pulsefit.subscription.repository.MembershipPlanRepository;
import com.pulsefit.subscription.repository.SubscriptionRepository;
import com.pulsefit.subscription.service.SubscriptionService;
import feign.FeignException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final MembershipPlanRepository planRepository;
    private final MemberClient memberClient;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository,
                                   MembershipPlanRepository planRepository,
                                   MemberClient memberClient) {
        this.subscriptionRepository = subscriptionRepository;
        this.planRepository = planRepository;
        this.memberClient = memberClient;
    }

    @Override
    public SubscriptionResponseDto createSubscription(SubscriptionRequestDto requestDto) {
        // 1. Verify Member exists via OpenFeign call to Member Service
        try {
            MemberClientDto member = memberClient.getMemberById(requestDto.getMemberId());
            if (member == null) {
                throw new MemberNotFoundException(requestDto.getMemberId());
            }
        } catch (FeignException.NotFound ex) {
            throw new MemberNotFoundException(requestDto.getMemberId());
        }

        // 2. Verify Plan exists
        MembershipPlan plan = planRepository.findById(requestDto.getPlanId())
                .orElseThrow(() -> new PlanNotFoundException(requestDto.getPlanId()));

        // 3. Create Subscription
        LocalDate start = requestDto.getStartDate() != null ? requestDto.getStartDate() : LocalDate.now();
        LocalDate end = start.plusMonths(plan.getDurationInMonths());

        Subscription subscription = new Subscription();
        subscription.setMemberId(requestDto.getMemberId());
        subscription.setPlanId(requestDto.getPlanId());
        subscription.setStartDate(start);
        subscription.setEndDate(end);
        subscription.setStatus("ACTIVE");

        Subscription saved = subscriptionRepository.save(subscription);
        return mapToResponseDto(saved, plan);
    }

    @Override
    public List<SubscriptionResponseDto> getAllSubscriptions() {
        return subscriptionRepository.findAll().stream()
                .map(this::checkAndMapSubscription)
                .collect(Collectors.toList());
    }

    @Override
    public SubscriptionResponseDto getSubscriptionById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new SubscriptionNotFoundException(id));
        return checkAndMapSubscription(subscription);
    }

    @Override
    public List<SubscriptionResponseDto> getSubscriptionsByMemberId(Long memberId) {
        return subscriptionRepository.findByMemberId(memberId).stream()
                .map(this::checkAndMapSubscription)
                .collect(Collectors.toList());
    }

    @Override
    public SubscriptionResponseDto renewSubscription(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new SubscriptionNotFoundException(id));

        MembershipPlan plan = planRepository.findById(subscription.getPlanId())
                .orElseThrow(() -> new PlanNotFoundException(subscription.getPlanId()));

        LocalDate today = LocalDate.now();
        LocalDate newStart;
        LocalDate newEnd;

        // If currently active and end date is in the future, extend from existing end date
        if ("ACTIVE".equalsIgnoreCase(subscription.getStatus()) && subscription.getEndDate().isAfter(today)) {
            newStart = subscription.getEndDate();
            newEnd = newStart.plusMonths(plan.getDurationInMonths());
        } else {
            // If already expired or cancelled, start renewal fresh from today
            newStart = today;
            newEnd = today.plusMonths(plan.getDurationInMonths());
        }

        subscription.setStartDate(newStart);
        subscription.setEndDate(newEnd);
        subscription.setStatus("ACTIVE");

        Subscription updated = subscriptionRepository.save(subscription);
        return mapToResponseDto(updated, plan);
    }

    @Override
    public SubscriptionResponseDto cancelSubscription(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new SubscriptionNotFoundException(id));

        subscription.setStatus("CANCELLED");
        Subscription updated = subscriptionRepository.save(subscription);

        MembershipPlan plan = planRepository.findById(updated.getPlanId()).orElse(null);
        return mapToResponseDto(updated, plan);
    }

    private SubscriptionResponseDto checkAndMapSubscription(Subscription subscription) {
        // Automatic expiration check based on endDate
        if ("ACTIVE".equalsIgnoreCase(subscription.getStatus()) &&
                subscription.getEndDate().isBefore(LocalDate.now())) {
            subscription.setStatus("EXPIRED");
            subscription = subscriptionRepository.save(subscription);
        }

        MembershipPlan plan = planRepository.findById(subscription.getPlanId()).orElse(null);
        return mapToResponseDto(subscription, plan);
    }

    private SubscriptionResponseDto mapToResponseDto(Subscription subscription, MembershipPlan plan) {
        String planName = plan != null ? plan.getName() : "Unknown Plan";
        Double price = plan != null ? plan.getPrice() : 0.0;

        return new SubscriptionResponseDto(
                subscription.getId(),
                subscription.getMemberId(),
                subscription.getPlanId(),
                planName,
                price,
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getStatus()
        );
    }
}
