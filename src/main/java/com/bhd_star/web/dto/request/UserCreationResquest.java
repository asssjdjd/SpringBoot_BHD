package com.bhd_star.web.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserCreationResquest {
    @Size(min = 6, message = "USERNAME_INVALID")
    String username;

    String phonenumber;

    LocalDate dob;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;
}
