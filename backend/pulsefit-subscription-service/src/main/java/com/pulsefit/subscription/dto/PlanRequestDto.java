package com.pulsefit.subscription.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class PlanRequestDto {

    @NotBlank(message = "Plan name is required")
    private String name;

    @NotNull(message = "Duration in months is required")
    @Positive(message = "Duration in months must be positive")
    private Integer durationInMonths;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than zero")
    private Double price;

    private String description;

    private String status;

    public PlanRequestDto() {
    }

    public PlanRequestDto(String name, Integer durationInMonths, Double price, String description, String status) {
        this.name = name;
        this.durationInMonths = durationInMonths;
        this.price = price;
        this.description = description;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDurationInMonths() {
        return durationInMonths;
    }

    public void setDurationInMonths(Integer durationInMonths) {
        this.durationInMonths = durationInMonths;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
