package com.bhd_star.web.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FilmResponse {
    String id;
    String video_link;
    String images;
    String name;
    int duration;
    String name_director;
    LocalDate launch_date;
    String description;
    String category_name;
    String deleteUrls;
}
