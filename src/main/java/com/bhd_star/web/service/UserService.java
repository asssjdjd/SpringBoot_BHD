package com.bhd_star.web.service;

import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.mapper.UserMapper;
import com.bhd_star.web.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserService {

    UserMapper userMapper;
    UserRepository userRepository;

    public List<UserResponse> getShowUsers(){
        log.info("show all Users");
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse).toList();
    }

    public UserResponse createUser(UserCreationResquest request) {
        User user = userMapper.toUser(request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

}
