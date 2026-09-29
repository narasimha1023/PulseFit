package com.pulsefit.attendance.service;

import com.pulsefit.attendance.client.MemberClient;
import com.pulsefit.attendance.client.dto.MemberClientDto;
import com.pulsefit.attendance.dto.AttendanceResponseDto;
import com.pulsefit.attendance.dto.CheckInRequestDto;
import com.pulsefit.attendance.entity.Attendance;
import com.pulsefit.attendance.exception.AttendanceNotFoundException;
import com.pulsefit.attendance.exception.MemberNotFoundException;
import com.pulsefit.attendance.repository.AttendanceRepository;
import com.pulsefit.attendance.service.impl.AttendanceServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceTest {

    @Mock
    private AttendanceRepository attendanceRepository;

    @Mock
    private MemberClient memberClient;

    @InjectMocks
    private AttendanceServiceImpl attendanceService;

    private Attendance sampleAttendance;
    private MemberClientDto sampleMember;

    @BeforeEach
    void setUp() {
        sampleMember = new MemberClientDto(1L, "Narasimha Reddy", "narasimha@example.com", "9876543210", "ACTIVE");
        sampleAttendance = new Attendance(501L, 1L, "Main Gym", LocalDateTime.now(), null, "CHECKED_IN");
    }

    @Test
    @DisplayName("Should check in successfully when member exists")
    void checkIn_Success() {
        CheckInRequestDto requestDto = new CheckInRequestDto(1L, "Main Gym");

        when(memberClient.getMemberById(1L)).thenReturn(sampleMember);
        when(attendanceRepository.save(any(Attendance.class))).thenReturn(sampleAttendance);

        AttendanceResponseDto response = attendanceService.checkIn(requestDto);

        assertNotNull(response);
        assertEquals(501L, response.getId());
        assertEquals(1L, response.getMemberId());
        assertEquals("Narasimha Reddy", response.getMemberName());
        assertEquals("Main Gym", response.getFacilityId());
        assertEquals("CHECKED_IN", response.getStatus());
        verify(memberClient, times(1)).getMemberById(1L);
        verify(attendanceRepository, times(1)).save(any(Attendance.class));
    }

    @Test
    @DisplayName("Should throw MemberNotFoundException when member does not exist in Member Service")
    void checkIn_MemberNotFound_ThrowsException() {
        CheckInRequestDto requestDto = new CheckInRequestDto(99L, "Main Gym");

        when(memberClient.getMemberById(99L)).thenReturn(null);

        assertThrows(MemberNotFoundException.class, () -> attendanceService.checkIn(requestDto));
        verify(attendanceRepository, never()).save(any(Attendance.class));
    }

    @Test
    @DisplayName("Should check out successfully and set status to COMPLETED")
    void checkOut_Success() {
        when(attendanceRepository.findById(501L)).thenReturn(Optional.of(sampleAttendance));
        when(attendanceRepository.save(any(Attendance.class))).thenReturn(sampleAttendance);
        when(memberClient.getMemberById(1L)).thenReturn(sampleMember);

        AttendanceResponseDto response = attendanceService.checkOut(501L);

        assertNotNull(response);
        assertEquals("COMPLETED", response.getStatus());
        assertNotNull(sampleAttendance.getCheckOutTime());
        verify(attendanceRepository, times(1)).save(sampleAttendance);
    }

    @Test
    @DisplayName("Should throw AttendanceNotFoundException when attendance record does not exist")
    void checkOut_NotFound_ThrowsException() {
        when(attendanceRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(AttendanceNotFoundException.class, () -> attendanceService.checkOut(999L));
        verify(attendanceRepository, never()).save(any(Attendance.class));
    }

    @Test
    @DisplayName("Should find attendance logs by member ID")
    void getAttendanceByMemberId_Success() {
        when(attendanceRepository.findByMemberId(1L)).thenReturn(List.of(sampleAttendance));
        when(memberClient.getMemberById(1L)).thenReturn(sampleMember);

        List<AttendanceResponseDto> logs = attendanceService.getAttendanceByMemberId(1L);

        assertEquals(1, logs.size());
        assertEquals(501L, logs.get(0).getId());
        assertEquals("Narasimha Reddy", logs.get(0).getMemberName());
    }

    @Test
    @DisplayName("Should find attendance logs by facility ID")
    void getAttendanceByFacilityId_Success() {
        when(attendanceRepository.findByFacilityId("Main Gym")).thenReturn(List.of(sampleAttendance));
        when(memberClient.getMemberById(1L)).thenReturn(sampleMember);

        List<AttendanceResponseDto> logs = attendanceService.getAttendanceByFacilityId("Main Gym");

        assertEquals(1, logs.size());
        assertEquals("Main Gym", logs.get(0).getFacilityId());
    }
}
