package com.bhd_star.web.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppException extends RuntimeException {

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessge());
        this.errorCode = errorCode;
    }

    private ErrorCode errorCode;
}
