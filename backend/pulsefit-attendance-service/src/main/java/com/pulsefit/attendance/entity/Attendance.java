package com.pulsefit.attendance.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * PulseFit Health Clubs (PS023)
 * Attendance Entity recording facility turnstile check-ins and check-outs.
 */
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false, length = 100)
    private String facilityId;

    @Column(nullable = false)
    private LocalDateTime checkInTime;

    @Column
    private LocalDateTime checkOutTime;

    @Column(nullable = false, length = 20)
    private String status; // CHECKED_IN, COMPLETED

    public Attendance() {
    }

    public Attendance(Long id, Long memberId, String facilityId, LocalDateTime checkInTime, LocalDateTime checkOutTime, String status) {
        this.id = id;
        this.memberId = memberId;
        this.facilityId = facilityId;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.status = status;
    }

    @PrePersist
    protected void onCreate() {
        if (this.checkInTime == null) {
            this.checkInTime = LocalDateTime.now();
        }
        if (this.status == null || this.status.isBlank()) {
            this.status = "CHECKED_IN";
        }
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
