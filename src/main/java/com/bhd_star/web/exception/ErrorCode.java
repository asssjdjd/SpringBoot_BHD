package com.bhd_star.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    // common exception
    GLOBAL_EXCEPTION(9999, "you have some exceptions, please check log to view it!", HttpStatus.INTERNAL_SERVER_ERROR),
    RUNTIME_EXCEPTION(
            9998, "you have some runtime exception, please check log to view it", HttpStatus.INTERNAL_SERVER_ERROR),
    IO_EXCEPTION(9998, "you have some io exception,please check log to view it", HttpStatus.INTERNAL_SERVER_ERROR),
    IMAGE_NOT_UPLOAD(9997, "your images have some problems, please check it", HttpStatus.BAD_REQUEST),
    VALIDATION(1003, "invalid type input", HttpStatus.BAD_REQUEST),
    MEDIA_EXCEPTION(9996, "you have some problems about data,please check it", HttpStatus.BAD_REQUEST),
    INVALID_KEY(9999, "Uncategorized error", HttpStatus.BAD_REQUEST),
    NOT_FOUND_ROLE(9000,"Don't find role",HttpStatus.NOT_FOUND),
    NOT_FOUND_PERMISSIONS(9000,"Don't find permission",HttpStatus.NOT_FOUND),

    // user exception: 1000
    USER_EXISTED(1001, "user has exited", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1002, "User not found", HttpStatus.NOT_FOUND),
    USERNAME_INVALID(1003, "username must at least 6 charactors", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "password at least 8 charactors", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1005, "unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1006, "you don't have permisssion", HttpStatus.FORBIDDEN),

    // film exception
    FILM_EXISTED(2001, "film has exited", HttpStatus.BAD_REQUEST),
    FILM_NOT_FOUND(2002, "Film not found", HttpStatus.NOT_FOUND),

    // category exception
    CATEGORY_TYPE_EXISTED(3001, "category has exited", HttpStatus.BAD_REQUEST),
    CATEGORY_TYPE_NOT_FOUND(3002, "category type not found", HttpStatus.NOT_FOUND),

    // theater exception
    THEATER_EXITED(4001, "theater has exited", HttpStatus.BAD_REQUEST),
    THEATER_NOT_FOUND(4002, "theater not found", HttpStatus.NOT_FOUND),
    INVALID_EMAIL(4003, "you failed email,please try again", HttpStatus.BAD_REQUEST),

    // showtime exception
    SHOWTIME_EXITED(5001, "showtime has exited", HttpStatus.BAD_REQUEST),
    SHOWTIME_NOT_FOUND(5002, "showtime not found", HttpStatus.NOT_FOUND);

    private int code;
    private String messge;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String messge, HttpStatusCode statusCode) {
        this.code = code;
        this.messge = messge;
        this.statusCode = statusCode;
    }
}
