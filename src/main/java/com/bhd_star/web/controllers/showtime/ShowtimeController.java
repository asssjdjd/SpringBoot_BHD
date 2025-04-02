package com.bhd_star.web.controllers.showtime;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.bhd_star.web.dto.request.ShowtimeCreationRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.ShowtimeReponse;
import com.bhd_star.web.service.ShowtimeService;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/showtime")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Builder
@Slf4j
public class ShowtimeController {
    ShowtimeService showtimeService;

    @GetMapping
    ApiResponse<List<ShowtimeReponse>> getShowtimes() {
        List<ShowtimeReponse> showtimes = showtimeService.getShowTimes();
        return ApiResponse.<List<ShowtimeReponse>>builder().response(showtimes).build();
    }

    @PostMapping
    ApiResponse<ShowtimeReponse> createShowtime(@RequestBody ShowtimeCreationRequest request) {
        return ApiResponse.<ShowtimeReponse>builder()
                .response(showtimeService.createShowtime(request))
                .build();
    }

    @DeleteMapping("/{showtimeId}")
    ApiResponse<String> deleteShowtime(@PathVariable Long showtimeId) {
        String showtime_name = showtimeService.deleteShowtime(showtimeId);
        return ApiResponse.<String>builder()
                .response("user has " + showtime_name + " has been deleted")
                .build();
    }

    @PutMapping("{showtimeId}")
    ApiResponse<ShowtimeReponse> updateShowtime(
            @PathVariable Long showtimeId, @RequestBody ShowtimeCreationRequest request) {
        log.info("excuted this function updateUser");
        return ApiResponse.<ShowtimeReponse>builder()
                .response(showtimeService.updateShowtime(showtimeId, request))
                .build();
    }

    @GetMapping("/{showtimeId}")
    ApiResponse<ShowtimeReponse> getShowTimes(@PathVariable Long showtimeId) {
        return ApiResponse.<ShowtimeReponse>builder()
                .response(showtimeService.getShowtime(showtimeId))
                .build();
    }
}
