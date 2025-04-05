package com.bhd_star.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhd_star.web.dto.request.PermissionRequest;
import com.bhd_star.web.dto.response.PermissionResponse;
import com.bhd_star.web.entity.Permission;
import com.bhd_star.web.mapper.PermissionMapper;
import com.bhd_star.web.repository.PermissionRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    public PermissionResponse createPermission(PermissionRequest request) {
        Permission permisson = permissionMapper.toPermission(request);
        permisson = permissionRepository.save(permisson);
        return permissionMapper.toPermissionResponse(permisson);
    }

    public List<PermissionResponse> getAll() {
        var permissions = permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    public void delete(String permission) {
        permissionRepository.deleteById(permission);
    }
}
