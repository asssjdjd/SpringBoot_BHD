package com.bhd_star.web.mapper;

import com.bhd_star.web.dto.request.FilmCreationRequest;
import com.bhd_star.web.dto.response.FilmResponse;
import com.bhd_star.web.entity.Film;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FilmMapper {
    @Mapping(target = "images", ignore = true)
    Film toFilm(FilmCreationRequest request);

//    @Mapping(target = "images", ignore = true)
    FilmResponse toFilmResponse(Film film);

    @Mapping(target = "images",ignore = true)
    void updateFilm(@MappingTarget Film film, FilmCreationRequest filmCreationRequest);
}
