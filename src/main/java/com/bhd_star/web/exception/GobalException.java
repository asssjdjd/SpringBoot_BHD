package com.bhd_star.web.exception;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

import jakarta.validation.ConstraintViolation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.bhd_star.web.dto.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GobalException {
    //    xu ly lop exception chung vi du cac van de khac
    private static final String MIN_ATTRIBUTE = "min";
    
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(Exception exception) {
        log.error("Exception : ", exception);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.GLOBAL_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.GLOBAL_EXCEPTION.getMessge());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse> handleRuntimeException(RuntimeException exception) {
        log.error("RuntimeException: ", exception);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.RUNTIME_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.RUNTIME_EXCEPTION.getMessge());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ApiResponse> handleIOException(IOException exception) {
        log.error("IOException: ", exception);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.IO_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.IO_EXCEPTION.getMessge());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingUserException(AppException exception) {
        ApiResponse apiResponse = new ApiResponse();
        ErrorCode errorCode = exception.getErrorCode();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessge());
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = HttpMediaTypeNotSupportedException.class)
    ResponseEntity<ApiResponse> handlingMediaException(HttpMediaTypeNotSupportedException exception) {
        log.error("HttpMediaTypeNotSupportedException: ", exception);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.MEDIA_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.MEDIA_EXCEPTION.getMessge());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    //    @ExceptionHandler(value = AccessDeniedException.class)
    //    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception) {
    //        ApiResponse apiResponse = new ApiResponse();
    //        ErorrCode erorrCode = ErorrCode.UNAUTHORIZED;
    //
    //        apiResponse.setCode(erorrCode.getCode());
    //        apiResponse.setMessage(erorrCode.getMessage());
    //
    //        return ResponseEntity
    //                .status(erorrCode.getStatusCode())
    //                .body(apiResponse);
    //
    //    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception){
        String enumKey = exception.getFieldError().getDefaultMessage();

        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        Map<String, Object> attributes = null;
        try {
//            neu cai nay dung thi in ra
            errorCode = ErrorCode.valueOf(enumKey);

            var constraintViolation = exception.getBindingResult()
                    .getAllErrors().getFirst().unwrap(ConstraintViolation.class);

            attributes = constraintViolation.getConstraintDescriptor().getAttributes();

            log.info(attributes.toString());

        } catch (IllegalArgumentException e){
            log.info("you failed the name exception");
        }

        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(Objects.nonNull(attributes) ?
                mapAttribute(errorCode.getMessge(), attributes)
                : errorCode.getMessge());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes){
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{" + MIN_ATTRIBUTE + "}", minValue);
    }
}
