package com.bhd_star.web.mapper;

import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.repository.UserRepository;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationResquest userCreationResquest);
    UserResponse toUserResponse(User user);

}
