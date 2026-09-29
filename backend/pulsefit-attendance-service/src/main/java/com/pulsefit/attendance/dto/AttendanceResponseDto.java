package com.pulsefit.attendance.dto;

import java.time.LocalDateTime;

public class AttendanceResponseDto {

    private Long id;
    private Long memberId;
    private String memberName;
    private String facilityId;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String status;

    public AttendanceResponseDto() {
    }

    public AttendanceResponseDto(Long id, Long memberId, String memberName, String facilityId, LocalDateTime checkInTime, LocalDateTime checkOutTime, String status) {
        this.id = id;
        this.memberId = memberId;
        this.memberName = memberName;
        this.facilityId = facilityId;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
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

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(String facilityId) {
        this.facilityId = facilityId;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
