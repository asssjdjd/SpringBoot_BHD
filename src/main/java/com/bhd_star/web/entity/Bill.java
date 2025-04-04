package com.bhd_star.web.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    LocalDate time_buy;
    Long total;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    List<String> description = new ArrayList<>();
}
