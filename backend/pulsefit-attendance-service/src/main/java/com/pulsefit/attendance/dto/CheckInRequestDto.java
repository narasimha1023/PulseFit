package com.pulsefit.attendance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CheckInRequestDto {

    @NotNull(message = "Member ID is required")
    private Long memberId;

    @NotBlank(message = "Facility ID is required")
    private String facilityId;

    public CheckInRequestDto() {
    }

    public CheckInRequestDto(Long memberId, String facilityId) {
        this.memberId = memberId;
        this.facilityId = facilityId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(String facilityId) {
        this.facilityId = facilityId;
    }
}
