package com.ritik.chatbackend.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
    private String message;
    private int statusCode;
    private String error;
    private String path;
    private long timestamp;
}
