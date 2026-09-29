package com.pulsefit.subscription.service.impl;

import com.pulsefit.subscription.dto.PlanRequestDto;
import com.pulsefit.subscription.dto.PlanResponseDto;
import com.pulsefit.subscription.entity.MembershipPlan;
import com.pulsefit.subscription.exception.PlanNotFoundException;
import com.pulsefit.subscription.repository.MembershipPlanRepository;
import com.pulsefit.subscription.service.PlanService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanServiceImpl implements PlanService {

    private final MembershipPlanRepository planRepository;

    public PlanServiceImpl(MembershipPlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    @Override
    public PlanResponseDto createPlan(PlanRequestDto requestDto) {
        MembershipPlan plan = new MembershipPlan();
        plan.setName(requestDto.getName());
        plan.setDurationInMonths(requestDto.getDurationInMonths());
        plan.setPrice(requestDto.getPrice());
        plan.setDescription(requestDto.getDescription());
        plan.setStatus(requestDto.getStatus() != null && !requestDto.getStatus().isBlank() ? requestDto.getStatus() : "ACTIVE");

        MembershipPlan saved = planRepository.save(plan);
        return mapToResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlanResponseDto> getAllPlans() {
        return planRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PlanResponseDto getPlanById(Long id) {
        MembershipPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new PlanNotFoundException(id));
        return mapToResponseDto(plan);
    }

    @Override
    public PlanResponseDto updatePlan(Long id, PlanRequestDto requestDto) {
        MembershipPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new PlanNotFoundException(id));

        plan.setName(requestDto.getName());
        plan.setDurationInMonths(requestDto.getDurationInMonths());
        plan.setPrice(requestDto.getPrice());
        plan.setDescription(requestDto.getDescription());
        if (requestDto.getStatus() != null && !requestDto.getStatus().isBlank()) {
            plan.setStatus(requestDto.getStatus());
        }

        MembershipPlan updated = planRepository.save(plan);
        return mapToResponseDto(updated);
    }

    @Override
    public void deletePlan(Long id) {
        if (!planRepository.existsById(id)) {
            throw new PlanNotFoundException(id);
        }
        planRepository.deleteById(id);
    }

    private PlanResponseDto mapToResponseDto(MembershipPlan plan) {
        return new PlanResponseDto(
                plan.getId(),
                plan.getName(),
                plan.getDurationInMonths(),
                plan.getPrice(),
                plan.getDescription(),
                plan.getStatus()
        );
    }
}
