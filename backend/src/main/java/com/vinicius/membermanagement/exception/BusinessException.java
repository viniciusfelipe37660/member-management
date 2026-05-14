package com.vinicius.membermanagement.exception;

import org.springframework.http.HttpStatus;

public class BusinessException extends RuntimeException {

    private final HttpStatus status;
    private final String field;

    public BusinessException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.field = null;
    }

    public BusinessException(String message, HttpStatus status, String field) {
        super(message);
        this.status = status;
        this.field = field;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getField() {
        return field;
    }
}
