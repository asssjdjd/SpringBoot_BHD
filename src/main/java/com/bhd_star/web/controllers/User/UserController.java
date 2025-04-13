package com.bhd_star.web.controllers.User;

import java.util.List;

import com.bhd_star.web.dto.request.UsernameRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.request.UserUpdateRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.service.UserService;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Builder
@Slf4j
public class UserController {

    UserService userService;

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        List<UserResponse> users = userService.getShowUsers();
        return ApiResponse.<List<UserResponse>>builder().response(users).build();
    }

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationResquest request) {
        return ApiResponse.<UserResponse>builder()
                .response(userService.createUser(request))
                .build();
    }

    @DeleteMapping("/{userId}")
    ApiResponse<String> deleteUser(@PathVariable String userId) {
        String username = userService.deleteUser(userId);
        return ApiResponse.<String>builder()
                .response("user has " + username + " has been deleted")
                .build();
    }

    @PutMapping("{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
        log.info("excuted this function updateUser");
        return ApiResponse.<UserResponse>builder()
                .response(userService.updateUser(userId, request))
                .build();
    }

    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable String userId) {
        return ApiResponse.<UserResponse>builder()
                .response(userService.getUser(userId))
                .build();
    }

    @PostMapping("/my-profile")
    ApiResponse<UserResponse> getMyProfile(@RequestBody UsernameRequest request) {
        return ApiResponse.<UserResponse>builder()
                .response(userService.getUserByUsername(request.getUsername()))
                .build();
    }

}
