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
public class FoodComboCreationRequest {

//    String deleteUrls;

    List<MultipartFile> images;

    String name;

    String description;

    Long price;

    Long theater_id;
}
