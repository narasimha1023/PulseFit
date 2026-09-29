package com.pulsefit.attendance.exception;

public class MemberNotFoundException extends RuntimeException {

    public MemberNotFoundException(String message) {
        super(message);
    }

    public MemberNotFoundException(Long id) {
        super("Member not found with id: " + id + ". Cannot perform facility check-in.");
    }
}
