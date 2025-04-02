package com.bhd_star.web.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String video_link;

    String deleteUrls;

    @Column(name = "images", length = 1024)
    String images;

    String name;
    int duration;
    String name_director;
    LocalDate launch_date;
    String description;
    String category_name;
}
