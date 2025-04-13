package com.bhd_star.web.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodComboResponse {

    Long id;

//    String deleteUrls;

    String images;

    String name;

    String description;

    Long price;

    Long theater_id;
}
