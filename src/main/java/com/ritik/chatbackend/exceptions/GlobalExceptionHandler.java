package com.ritik.chatbackend.exceptions;

import com.ritik.chatbackend.dtos.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyInGroupException.class)
    public ErrorResponse handleUserAlreadyInGroupException(UserAlreadyInGroupException e) {
        return ErrorResponse.builder()
                .message(e.getMessage())
                .path(e.getStackTrace()[0].getClassName())
                .statusCode(409)
                .timestamp(System.currentTimeMillis())
                .error(e.getClass().getSimpleName())
                .build();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ErrorResponse handleResourceNotFoundException(ResourceNotFoundException e) {
        return ErrorResponse.builder()
                .message(e.getMessage())
                .error(e.getResourceName() + " not found with " + e.getFieldName() + " " + e.getFieldValue())
                .path(e.getStackTrace()[0].getClassName())
                .statusCode(404)
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
