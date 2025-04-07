package com.bhd_star.web.service;

import com.bhd_star.web.repository.InvalidatedTokenRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ScheduledService {
    @Autowired
    InvalidatedTokenRepository tokenRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void deleteExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        tokenRepository.deleteByExpiryTimeBefore(now);
        System.out.println("✅ Đã xóa token hết hạn trước " + now);
    }

}
