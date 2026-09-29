package com.pulsefit.attendance.service.impl;

import com.pulsefit.attendance.client.MemberClient;
import com.pulsefit.attendance.client.dto.MemberClientDto;
import com.pulsefit.attendance.dto.AttendanceResponseDto;
import com.pulsefit.attendance.dto.CheckInRequestDto;
import com.pulsefit.attendance.entity.Attendance;
import com.pulsefit.attendance.exception.AttendanceNotFoundException;
import com.pulsefit.attendance.exception.MemberNotFoundException;
import com.pulsefit.attendance.repository.AttendanceRepository;
import com.pulsefit.attendance.service.AttendanceService;
import feign.FeignException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final MemberClient memberClient;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository, MemberClient memberClient) {
        this.attendanceRepository = attendanceRepository;
        this.memberClient = memberClient;
    }

    @Override
    public AttendanceResponseDto checkIn(CheckInRequestDto requestDto) {
        // 1. Verify Member exists via OpenFeign call to Member Service
        String memberName = "Member #" + requestDto.getMemberId();
        try {
            MemberClientDto member = memberClient.getMemberById(requestDto.getMemberId());
            if (member == null) {
                throw new MemberNotFoundException(requestDto.getMemberId());
            }
            memberName = member.getName();
        } catch (FeignException.NotFound ex) {
            throw new MemberNotFoundException(requestDto.getMemberId());
        }

        // 2. Create Attendance record
        Attendance attendance = new Attendance();
        attendance.setMemberId(requestDto.getMemberId());
        attendance.setFacilityId(requestDto.getFacilityId());
        attendance.setCheckInTime(LocalDateTime.now());
        attendance.setStatus("CHECKED_IN");

        Attendance saved = attendanceRepository.save(attendance);
        return mapToResponseDto(saved, memberName);
    }

    @Override
    public AttendanceResponseDto checkOut(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new AttendanceNotFoundException(id));

        attendance.setCheckOutTime(LocalDateTime.now());
        attendance.setStatus("COMPLETED");

        Attendance updated = attendanceRepository.save(attendance);
        String memberName = fetchMemberNameSafely(updated.getMemberId());
        return mapToResponseDto(updated, memberName);
    }

    @Override
    @Transactional(readOnly = true)
    public AttendanceResponseDto getAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new AttendanceNotFoundException(id));

        String memberName = fetchMemberNameSafely(attendance.getMemberId());
        return mapToResponseDto(attendance, memberName);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponseDto> getAttendanceByMemberId(Long memberId) {
        String memberName = fetchMemberNameSafely(memberId);
        return attendanceRepository.findByMemberId(memberId).stream()
                .map(att -> mapToResponseDto(att, memberName))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponseDto> getAttendanceByFacilityId(String facilityId) {
        return attendanceRepository.findByFacilityId(facilityId).stream()
                .map(att -> mapToResponseDto(att, fetchMemberNameSafely(att.getMemberId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponseDto> getAllAttendance() {
        return attendanceRepository.findAll().stream()
                .map(att -> mapToResponseDto(att, fetchMemberNameSafely(att.getMemberId())))
                .collect(Collectors.toList());
    }

    private String fetchMemberNameSafely(Long memberId) {
        try {
            MemberClientDto member = memberClient.getMemberById(memberId);
            return member != null ? member.getName() : "Member #" + memberId;
        } catch (Exception ex) {
            return "Member #" + memberId;
        }
    }

    private AttendanceResponseDto mapToResponseDto(Attendance attendance, String memberName) {
        return new AttendanceResponseDto(
                attendance.getId(),
                attendance.getMemberId(),
                memberName,
                attendance.getFacilityId(),
                attendance.getCheckInTime(),
                attendance.getCheckOutTime(),
                attendance.getStatus()
        );
    }
}
