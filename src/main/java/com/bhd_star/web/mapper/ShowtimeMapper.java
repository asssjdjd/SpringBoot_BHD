package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.bhd_star.web.dto.request.ShowtimeCreationRequest;
import com.bhd_star.web.dto.response.ShowtimeReponse;
import com.bhd_star.web.entity.Showtime;

@Mapper(componentModel = "spring")
public interface ShowtimeMapper {

    Showtime toShowtime(ShowtimeCreationRequest request);

    ShowtimeReponse toShowtimeReponse(Showtime showtime);

    void showtimeUpdate(@MappingTarget Showtime showtime, ShowtimeCreationRequest request);
}
