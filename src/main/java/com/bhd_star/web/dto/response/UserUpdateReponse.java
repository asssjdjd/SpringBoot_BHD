package com.bhd_star.web.dto.response;

import java.time.LocalDate;
import java.util.Set;

import com.bhd_star.web.entity.Role;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateReponse {
    String id;
    String username;
    String phonenumber;
    LocalDate dob;
    Set<Role> roles;
}
