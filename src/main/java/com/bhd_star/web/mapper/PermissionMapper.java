package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;

import com.bhd_star.web.dto.request.PermissionRequest;
import com.bhd_star.web.dto.response.PermissionResponse;
import com.bhd_star.web.entity.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
