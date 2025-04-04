package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bhd_star.web.dto.request.BillCreationResquest;
import com.bhd_star.web.dto.response.BillResponse;
import com.bhd_star.web.entity.Bill;

@Mapper(componentModel = "spring")
public interface BillMapper {
    @Mapping(target = "user", ignore = true)
    Bill toBill(BillCreationResquest request);

    BillResponse toBillResponse(Bill bill);
}
