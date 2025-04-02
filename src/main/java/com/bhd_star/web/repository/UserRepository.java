package com.bhd_star.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhd_star.web.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {}
