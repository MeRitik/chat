package com.ritik.chatbackend.exceptions;

import java.io.Serial;

public class UserAlreadyInGroupException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public UserAlreadyInGroupException(String message) {
        super(message);
    }

    public UserAlreadyInGroupException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserAlreadyInGroupException(Throwable cause) {
        super(cause);
    }

    public UserAlreadyInGroupException() {
        super();
    }

}
