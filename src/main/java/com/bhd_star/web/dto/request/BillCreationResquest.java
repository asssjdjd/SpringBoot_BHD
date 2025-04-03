package com.bhd_star.web.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.util.Pair;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

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
