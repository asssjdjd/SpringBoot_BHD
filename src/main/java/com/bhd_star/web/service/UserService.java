package com.bhd_star.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.request.UserUpdateRequest;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.mapper.UserMapper;
import com.bhd_star.web.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserMapper userMapper;
    UserRepository userRepository;

    public List<UserResponse> getShowUsers() {
        log.info("show all Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    public UserResponse createUser(UserCreationResquest request) {
        User user = userMapper.toUser(request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    //     viet exception
    public String deleteUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.deleteById(userId);
        return user.getUsername();
    }

    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse getUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toUserResponse(user);
    }
}
