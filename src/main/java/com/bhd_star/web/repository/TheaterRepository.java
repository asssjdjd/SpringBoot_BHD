package com.bhd_star.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhd_star.web.entity.Theater;

@Repository
public interface TheaterRepository extends JpaRepository<Theater, Long> {}
