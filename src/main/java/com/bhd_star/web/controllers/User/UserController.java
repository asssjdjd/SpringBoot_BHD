package com.bhd_star.web.controllers.User;


import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.mapper.UserMapper;
import com.bhd_star.web.repository.UserRepository;
import com.bhd_star.web.service.UserService;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Builder
@Slf4j
public class UserController {

    UserService userService;

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        List<UserResponse> users = userService.getShowUsers();
        return ApiResponse.<List<UserResponse>>builder()
                .response(users)
                .build();
    }

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody UserCreationResquest request) {
        return ApiResponse.<UserResponse>builder()
                .response(userService.createUser(request))
                .build();
    }

}
