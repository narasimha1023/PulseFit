package com.pulsefit.subscription.dto;

public class PlanResponseDto {

    private Long id;
    private String name;
    private Integer durationInMonths;
    private Double price;
    private String description;
    private String status;

    public PlanResponseDto() {
    }

    public PlanResponseDto(Long id, String name, Integer durationInMonths, Double price, String description, String status) {
        this.id = id;
        this.name = name;
        this.durationInMonths = durationInMonths;
        this.price = price;
        this.description = description;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
