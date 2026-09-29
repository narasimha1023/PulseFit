package com.pulsefit.subscription.service;

import com.pulsefit.subscription.dto.PlanRequestDto;
import com.pulsefit.subscription.dto.PlanResponseDto;

import java.util.List;

public interface PlanService {

    PlanResponseDto createPlan(PlanRequestDto requestDto);

    List<PlanResponseDto> getAllPlans();

    PlanResponseDto getPlanById(Long id);

    PlanResponseDto updatePlan(Long id, PlanRequestDto requestDto);

    void deletePlan(Long id);
}
