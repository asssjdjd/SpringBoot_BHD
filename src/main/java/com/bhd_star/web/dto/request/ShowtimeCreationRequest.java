package com.bhd_star.web.dto.request;

import java.time.LocalDate;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ShowtimeCreationRequest {
    LocalDate start_time;
    Long theater_id;
    String film_id;
}
