package com.bhd_star.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhd_star.web.entity.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {}
