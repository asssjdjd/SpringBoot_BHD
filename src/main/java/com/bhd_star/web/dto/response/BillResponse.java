package com.bhd_star.web.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.bhd_star.web.entity.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillResponse {
    String id;
    LocalDate time_buy;
    Long total;
    User user;
    List<String> description;
}
