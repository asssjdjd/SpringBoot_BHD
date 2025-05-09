package com.bhd_star.web.dto.request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ShowtimeCreationRequest {
    LocalDateTime start_time;
    String theater_id;
    String film_id;
}
