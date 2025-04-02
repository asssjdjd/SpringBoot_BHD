package com.bhd_star.web.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

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
    String deleteUrls;
}
