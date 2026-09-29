package com.pulsefit.subscription.service;

import com.pulsefit.subscription.dto.PlanRequestDto;
import com.pulsefit.subscription.dto.PlanResponseDto;
import com.pulsefit.subscription.entity.MembershipPlan;
import com.pulsefit.subscription.exception.PlanNotFoundException;
import com.pulsefit.subscription.repository.MembershipPlanRepository;
import com.pulsefit.subscription.service.impl.PlanServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PlanServiceTest {

    @Mock
    private MembershipPlanRepository planRepository;

    @InjectMocks
    private PlanServiceImpl planService;

    private MembershipPlan samplePlan;
    private PlanRequestDto requestDto;

    @BeforeEach
    void setUp() {
        samplePlan = new MembershipPlan(1L, "PREMIUM", 1, 2500.0, "All facilities pass", "ACTIVE");
        requestDto = new PlanRequestDto("PREMIUM", 1, 2500.0, "All facilities pass", "ACTIVE");
    }

    @Test
    @DisplayName("Should create membership plan successfully")
    void createPlan_Success() {
        when(planRepository.save(any(MembershipPlan.class))).thenReturn(samplePlan);

        PlanResponseDto response = planService.createPlan(requestDto);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("PREMIUM", response.getName());
        assertEquals(2500.0, response.getPrice());
        verify(planRepository, times(1)).save(any(MembershipPlan.class));
    }

    @Test
    @DisplayName("Should find plan by id")
    void getPlanById_Success() {
        when(planRepository.findById(1L)).thenReturn(Optional.of(samplePlan));

        PlanResponseDto response = planService.getPlanById(1L);

        assertNotNull(response);
        assertEquals("PREMIUM", response.getName());
    }

    @Test
    @DisplayName("Should throw PlanNotFoundException when plan does not exist")
    void getPlanById_NotFound_ThrowsException() {
        when(planRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(PlanNotFoundException.class, () -> planService.getPlanById(99L));
    }

    @Test
    @DisplayName("Should update plan successfully")
    void updatePlan_Success() {
        when(planRepository.findById(1L)).thenReturn(Optional.of(samplePlan));
        when(planRepository.save(any(MembershipPlan.class))).thenReturn(samplePlan);

        PlanResponseDto response = planService.updatePlan(1L, requestDto);

        assertNotNull(response);
        assertEquals("PREMIUM", response.getName());
        verify(planRepository, times(1)).save(samplePlan);
    }

    @Test
    @DisplayName("Should delete plan successfully")
    void deletePlan_Success() {
        when(planRepository.existsById(1L)).thenReturn(true);
        doNothing().when(planRepository).deleteById(1L);

        assertDoesNotThrow(() -> planService.deletePlan(1L));
        verify(planRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Should return all plans list")
    void getAllPlans_Success() {
        when(planRepository.findAll()).thenReturn(List.of(samplePlan));

        List<PlanResponseDto> plans = planService.getAllPlans();

        assertEquals(1, plans.size());
        assertEquals("PREMIUM", plans.get(0).getName());
    }
}
