package com.pulsefit.subscription.dto;

import java.time.LocalDate;

public class SubscriptionResponseDto {

    private Long id;
    private Long memberId;
    private Long planId;
    private String planName;
    private Double price;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;

    public SubscriptionResponseDto() {
    }

    public SubscriptionResponseDto(Long id, Long memberId, Long planId, String planName, Double price, LocalDate startDate, LocalDate endDate, String status) {
        this.id = id;
        this.memberId = memberId;
        this.planId = planId;
        this.planName = planName;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
