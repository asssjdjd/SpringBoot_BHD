package com.bhd_star.web.dto.request;

import java.time.LocalDate;
import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class BillCreationResquest {
    LocalDate time_buy;
    String user_id;
    List<String> description;
    Long total;
}
