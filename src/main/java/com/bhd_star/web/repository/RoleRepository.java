package com.bhd_star.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhd_star.web.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {}
