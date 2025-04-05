package com.bhd_star.web.dto.request;

import java.time.LocalDate;
import java.util.Set;

import com.bhd_star.web.entity.Role;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserUpdateRequest {
    String username;
    String phonenumber;
    LocalDate dob;
    Set<Role> roles;
}
