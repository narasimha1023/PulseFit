package com.pulsefit.subscription.service;

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
import com.pulsefit.subscription.service.impl.SubscriptionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SubscriptionServiceTest {

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @Mock
    private MembershipPlanRepository planRepository;

    @Mock
    private MemberClient memberClient;

    @InjectMocks
    private SubscriptionServiceImpl subscriptionService;

    private MembershipPlan samplePlan;
    private Subscription sampleSubscription;
    private MemberClientDto sampleMember;

    @BeforeEach
    void setUp() {
        samplePlan = new MembershipPlan(1L, "PREMIUM", 1, 2500.0, "All facilities pass", "ACTIVE");
        sampleSubscription = new Subscription(100L, 1L, 1L, LocalDate.now(), LocalDate.now().plusMonths(1), "ACTIVE");
        sampleMember = new MemberClientDto(1L, "Narasimha Reddy", "narasimha@example.com", "9876543210", "ACTIVE");
    }

    @Test
    @DisplayName("Should create subscription successfully when member and plan exist")
    void createSubscription_Success() {
        SubscriptionRequestDto requestDto = new SubscriptionRequestDto(1L, 1L, LocalDate.now());

        when(memberClient.getMemberById(1L)).thenReturn(sampleMember);
        when(planRepository.findById(1L)).thenReturn(Optional.of(samplePlan));
        when(subscriptionRepository.save(any(Subscription.class))).thenReturn(sampleSubscription);

        SubscriptionResponseDto response = subscriptionService.createSubscription(requestDto);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals(1L, response.getMemberId());
        assertEquals("PREMIUM", response.getPlanName());
        assertEquals("ACTIVE", response.getStatus());
        verify(memberClient, times(1)).getMemberById(1L);
        verify(subscriptionRepository, times(1)).save(any(Subscription.class));
    }

    @Test
    @DisplayName("Should throw MemberNotFoundException when Member Service reports member does not exist")
    void createSubscription_MemberNotFound_ThrowsException() {
        SubscriptionRequestDto requestDto = new SubscriptionRequestDto(99L, 1L, LocalDate.now());

        when(memberClient.getMemberById(99L)).thenReturn(null);

        assertThrows(MemberNotFoundException.class, () -> subscriptionService.createSubscription(requestDto));
        verify(subscriptionRepository, never()).save(any(Subscription.class));
    }

    @Test
    @DisplayName("Should throw PlanNotFoundException when plan does not exist")
    void createSubscription_PlanNotFound_ThrowsException() {
        SubscriptionRequestDto requestDto = new SubscriptionRequestDto(1L, 99L, LocalDate.now());

        when(memberClient.getMemberById(1L)).thenReturn(sampleMember);
        when(planRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(PlanNotFoundException.class, () -> subscriptionService.createSubscription(requestDto));
        verify(subscriptionRepository, never()).save(any(Subscription.class));
    }

    @Test
    @DisplayName("Should renew subscription successfully by extending end date")
    void renewSubscription_Success() {
        when(subscriptionRepository.findById(100L)).thenReturn(Optional.of(sampleSubscription));
        when(planRepository.findById(1L)).thenReturn(Optional.of(samplePlan));
        when(subscriptionRepository.save(any(Subscription.class))).thenReturn(sampleSubscription);

        SubscriptionResponseDto response = subscriptionService.renewSubscription(100L);

        assertNotNull(response);
        assertEquals("ACTIVE", response.getStatus());
        verify(subscriptionRepository, times(1)).save(sampleSubscription);
    }

    @Test
    @DisplayName("Should cancel subscription successfully")
    void cancelSubscription_Success() {
        when(subscriptionRepository.findById(100L)).thenReturn(Optional.of(sampleSubscription));
        when(subscriptionRepository.save(any(Subscription.class))).thenReturn(sampleSubscription);
        when(planRepository.findById(1L)).thenReturn(Optional.of(samplePlan));

        SubscriptionResponseDto response = subscriptionService.cancelSubscription(100L);

        assertNotNull(response);
        assertEquals("CANCELLED", response.getStatus());
        verify(subscriptionRepository, times(1)).save(sampleSubscription);
    }

    @Test
    @DisplayName("Should find subscriptions by member ID")
    void getSubscriptionsByMemberId_Success() {
        when(subscriptionRepository.findByMemberId(1L)).thenReturn(List.of(sampleSubscription));
        when(planRepository.findById(1L)).thenReturn(Optional.of(samplePlan));

        List<SubscriptionResponseDto> list = subscriptionService.getSubscriptionsByMemberId(1L);

        assertEquals(1, list.size());
        assertEquals(100L, list.get(0).getId());
    }
}
