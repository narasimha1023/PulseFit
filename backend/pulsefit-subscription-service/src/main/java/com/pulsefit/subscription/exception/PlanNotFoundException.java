package com.pulsefit.subscription.exception;

public class PlanNotFoundException extends RuntimeException {

    public PlanNotFoundException(String message) {
        super(message);
    }

    public PlanNotFoundException(Long id) {
        super("Membership plan not found with id: " + id);
    }
}
