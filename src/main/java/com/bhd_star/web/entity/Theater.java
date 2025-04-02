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
public class Theater {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String address;
    String phone;
    String email;

    @Lob
    @Column(columnDefinition = "TEXT")
    String policy;

    String deleteUrls;
    String images;
}
