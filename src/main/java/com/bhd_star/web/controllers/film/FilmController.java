package com.bhd_star.web.controllers.film;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.bhd_star.web.dto.request.FilmCreationRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.FilmResponse;
import com.bhd_star.web.service.FilmService;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/films")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Builder
@Slf4j
public class FilmController {
    FilmService filmService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<FilmResponse> createFilm(@ModelAttribute FilmCreationRequest request) {
        try {
            return ApiResponse.<FilmResponse>builder()
                    .response(filmService.createFilm(request))
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public ApiResponse<List<FilmResponse>> showAllFilms() {
        return ApiResponse.<List<FilmResponse>>builder()
                .response(filmService.getAllFilms())
                .build();
    }

    @DeleteMapping("/{filmId}")
    public ApiResponse<String> deleteFilm(@PathVariable String filmId) {
        return ApiResponse.<String>builder()
                .response("Film " + filmService.deleteFilm(filmId) + " has been deleted")
                .build();
    }

    @PutMapping(value = "/{filmId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<FilmResponse> updateFilm(
            @PathVariable String filmId, @ModelAttribute FilmCreationRequest request) {
        return ApiResponse.<FilmResponse>builder()
                .response(filmService.updateFilm(filmId, request))
                .build();
    }

    @GetMapping("/{filmId}")
    ApiResponse<FilmResponse> showFilm(@PathVariable String filmId) {
        return ApiResponse.<FilmResponse>builder()
                .response(filmService.showFilm(filmId))
                .build();
    }
}
