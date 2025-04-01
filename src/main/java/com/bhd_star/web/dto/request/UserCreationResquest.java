package com.bhd_star.web.dto.request;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserCreationResquest {
    String username;
    String phonenumber;
    LocalDate dob;
    String password;

}
