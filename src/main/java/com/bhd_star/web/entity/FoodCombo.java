package com.bhd_star.web.entity;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class FoodCombo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

//    String deleteUrls;

    @Column(name = "images", length = 1024)
    String images;

    String name;

    String description;

    Long price;

    Long theater_id;
}
