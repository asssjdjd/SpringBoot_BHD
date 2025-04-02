package com.bhd_star.web.dto.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TheaterCreationRequest {
    String name;
    String address;
    String phone;
    String email;

    String policy;

    String deleteUrls;

    List<MultipartFile> images;
}
