package com.bhd_star.web.service;

import java.util.HashSet;
import java.util.List;

import com.bhd_star.web.repository.RoleRepository;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.request.UserUpdateRequest;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.Role;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.exception.AppException;
import com.bhd_star.web.exception.ErrorCode;
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
    RoleRepository roleRepository;
    // hasAuthority('APPROVE_POST') or

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getShowUsers() {
        //        log.info("show all Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    public UserResponse createUser(UserCreationResquest request) {
        String name = request.getUsername();
        if (userRepository.existsByUsername(name)) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userMapper.toUser(request);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        log.info("new Password : " + user.getPassword());

        user.setRoles(new HashSet<>());

//        Role role = new Role();
//        role.setName("USER");
//        role.setDescription("user " + user.getUsername() + "has been created");
          Role role = roleRepository.findById("USER")
                  .orElseThrow(() ->new AppException(ErrorCode.NOT_FOUND_ROLE));

          user.getRoles().add(role);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    //     viet exception
    public String deleteUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        userRepository.deleteById(userId);
        return user.getUsername();
    }


    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse getUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toUserResponse(user);
    }

    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toUserResponse(user);
    }

}
