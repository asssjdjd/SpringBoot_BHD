package com.bhd_star.web.repository;

import com.bhd_star.web.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken,String> {
    void deleteByExpiryTimeBefore(LocalDateTime now);
}
