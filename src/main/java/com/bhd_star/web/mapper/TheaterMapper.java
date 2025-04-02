package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.bhd_star.web.dto.request.TheaterCreationRequest;
import com.bhd_star.web.dto.response.TheaterResponse;
import com.bhd_star.web.entity.Theater;

@Mapper(componentModel = "spring")
public interface TheaterMapper {
    @Mapping(target = "images", ignore = true)
    Theater toTheater(TheaterCreationRequest request);

    TheaterResponse toTheaterResponse(Theater theater);

    @Mapping(target = "images", ignore = true)
    void updateTheater(@MappingTarget Theater theater, TheaterCreationRequest request);
}
