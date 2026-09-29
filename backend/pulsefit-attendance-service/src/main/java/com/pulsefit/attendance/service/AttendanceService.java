package com.pulsefit.attendance.service;

import com.pulsefit.attendance.dto.AttendanceResponseDto;
import com.pulsefit.attendance.dto.CheckInRequestDto;

import java.util.List;

public interface AttendanceService {

    AttendanceResponseDto checkIn(CheckInRequestDto requestDto);

    AttendanceResponseDto checkOut(Long id);

    AttendanceResponseDto getAttendanceById(Long id);

    List<AttendanceResponseDto> getAttendanceByMemberId(Long memberId);

    List<AttendanceResponseDto> getAttendanceByFacilityId(String facilityId);

    List<AttendanceResponseDto> getAllAttendance();
}
