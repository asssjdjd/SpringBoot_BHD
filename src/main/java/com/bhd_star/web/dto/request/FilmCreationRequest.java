package com.bhd_star.web.dto.request;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class FilmCreationRequest {
    String video_link;
    List<MultipartFile> images;
    String name;
    int duration;
    String name_director;
    LocalDate launch_date;
    String description;
    String category_name;
//    String deleteUrls;
}
