package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bhd_star.web.dto.request.RoleRequest;
import com.bhd_star.web.dto.response.RoleResponse;
import com.bhd_star.web.entity.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    @Mapping(source = "permissions", target = "permissions")
    RoleResponse toRoleResponse(Role role);
}
