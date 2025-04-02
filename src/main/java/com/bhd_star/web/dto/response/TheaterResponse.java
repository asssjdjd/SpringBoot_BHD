package com.bhd_star.web.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TheaterResponse {
    Long id;
    String name;
    String address;
    String phone;
    String email;
    String deleteUrls;

    String policy;

    String images;
}
