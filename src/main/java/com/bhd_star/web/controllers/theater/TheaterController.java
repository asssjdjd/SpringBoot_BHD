package com.bhd_star.web.controllers.theater;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.bhd_star.web.dto.request.TheaterCreationRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.TheaterResponse;
import com.bhd_star.web.service.TheaterService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/theater")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TheaterController {
    TheaterService theaterService;

    @GetMapping
    public ApiResponse<List<TheaterResponse>> getAllTheater() {
        return ApiResponse.<List<TheaterResponse>>builder()
                .response(theaterService.getAllTheaters())
                .build();
    }

    @PostMapping
    public ApiResponse<TheaterResponse> createCategory(@ModelAttribute @Valid TheaterCreationRequest request) {
        return ApiResponse.<TheaterResponse>builder()
                .response(theaterService.createTheater(request))
                .build();
    }

    @DeleteMapping("/{theaterId}")
    public ApiResponse<String> deleteCateGory(@PathVariable Long theaterId) {
        String nameTheater = theaterService.deleteTheater(theaterId);
        return ApiResponse.<String>builder()
                .response("Film has name " + nameTheater + " has been deleted")
                .build();
    }

    //
    @PutMapping("/{theaterId}")
    ApiResponse<TheaterResponse> updateUser(
            @PathVariable Long theaterId, @ModelAttribute TheaterCreationRequest request) {
        //        log.info("excuted this function updateUser");
        return ApiResponse.<TheaterResponse>builder()
                .response(theaterService.updateTheater(theaterId, request))
                .build();
    }

    @GetMapping("/{theaterId}")
    ApiResponse<TheaterResponse> showFilm(@PathVariable Long theaterId) {
        return ApiResponse.<TheaterResponse>builder()
                .response(theaterService.showTheater(theaterId))
                .build();
    }
}
