package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.request.UserUpdateRequest;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationResquest userCreationResquest);

    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
