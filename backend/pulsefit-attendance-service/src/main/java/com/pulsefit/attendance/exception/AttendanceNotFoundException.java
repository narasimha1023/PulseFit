package com.pulsefit.attendance.exception;

public class AttendanceNotFoundException extends RuntimeException {

    public AttendanceNotFoundException(String message) {
        super(message);
    }

    public AttendanceNotFoundException(Long id) {
        super("Attendance record not found with id: " + id);
    }
}
