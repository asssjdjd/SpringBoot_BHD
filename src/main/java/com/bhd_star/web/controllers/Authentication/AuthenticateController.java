package com.bhd_star.web.controllers.Authentication;

import java.text.ParseException;

import com.bhd_star.web.dto.request.LogoutRequest;
import com.bhd_star.web.dto.request.RefreshTokenRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bhd_star.web.dto.request.AuthenticationRequest;
import com.bhd_star.web.dto.request.IntrospectRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.AuthenticationReponse;
import com.bhd_star.web.dto.response.IntrospectResponse;
import com.bhd_star.web.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticateController {

    AuthenticationService authenticationService;

    @PostMapping("/token")
    ApiResponse<AuthenticationReponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationReponse>builder().response(result).build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().response(result).build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> authenticate (@RequestBody LogoutRequest request) throws ParseException,JOSEException{
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationReponse> authenticate(@RequestBody RefreshTokenRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationReponse>builder()
                .response(result)
                .build();
    }
}
