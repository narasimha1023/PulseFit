package com.pulsefit.attendance.controller;

import com.pulsefit.attendance.dto.AttendanceResponseDto;
import com.pulsefit.attendance.dto.CheckInRequestDto;
import com.pulsefit.attendance.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/checkin")
    public ResponseEntity<AttendanceResponseDto> checkIn(@Valid @RequestBody CheckInRequestDto requestDto) {
        AttendanceResponseDto response = attendanceService.checkIn(requestDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/checkout/{id}")
    public ResponseEntity<AttendanceResponseDto> checkOut(@PathVariable Long id) {
        AttendanceResponseDto response = attendanceService.checkOut(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceResponseDto> getAttendanceById(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<AttendanceResponseDto>> getAttendanceByMemberId(@PathVariable Long memberId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByMemberId(memberId));
    }

    @GetMapping("/facility/{facilityId}")
    public ResponseEntity<List<AttendanceResponseDto>> getAttendanceByFacilityId(@PathVariable String facilityId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByFacilityId(facilityId));
    }

    @GetMapping
    public ResponseEntity<List<AttendanceResponseDto>> getAllAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }
}
