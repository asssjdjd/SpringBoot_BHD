package com.bhd_star.web.configuration;

import java.util.HashSet;
import java.util.Set;

import com.bhd_star.web.exception.AppException;
import com.bhd_star.web.exception.ErrorCode;
import com.bhd_star.web.repository.RoleRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.bhd_star.web.entity.Role;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                //                var roles = new HashSet<String>();
                //                roles.add(Role.ADMIN.name());
                Role role = roleRepository.findById("ADMIN").orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND_ROLE));
                HashSet roles = new HashSet();
                roles.add(role);

                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.warn("admin user has been created with default password: admin, please change it");
            }
        };
    }
}
