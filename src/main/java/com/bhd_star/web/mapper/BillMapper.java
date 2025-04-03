package com.bhd_star.web.mapper;

import com.bhd_star.web.dto.request.BillCreationResquest;
import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.request.UserUpdateRequest;
import com.bhd_star.web.dto.response.BillResponse;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.Bill;
import com.bhd_star.web.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BillMapper {
    @Mapping(target = "user",ignore = true)
    Bill toBill(BillCreationResquest request);


    BillResponse toBillResponse(Bill bill);


}
