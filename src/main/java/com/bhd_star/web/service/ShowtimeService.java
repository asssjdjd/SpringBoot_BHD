package com.bhd_star.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhd_star.web.dto.request.ShowtimeCreationRequest;
import com.bhd_star.web.dto.response.ShowtimeReponse;
import com.bhd_star.web.entity.Showtime;
import com.bhd_star.web.mapper.ShowtimeMapper;
import com.bhd_star.web.repository.ShowtimeRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShowtimeService {
    ShowtimeRepository showtimeRepository;
    ShowtimeMapper showtimeMapper;

    public List<ShowtimeReponse> getShowTimes() {
        log.info("show all Users");
        return showtimeRepository.findAll().stream()
                .map(showtimeMapper::toShowtimeReponse)
                .toList();
    }

    public ShowtimeReponse createShowtime(ShowtimeCreationRequest request) {
        Showtime showtime = showtimeMapper.toShowtime(request);
        return showtimeMapper.toShowtimeReponse(showtimeRepository.save(showtime));
    }

    //     viet exception
    public String deleteShowtime(Long showtimeId) {
        Showtime showtime =
                showtimeRepository.findById(showtimeId).orElseThrow(() -> new RuntimeException("Showtime not found"));
        showtimeRepository.deleteById(showtimeId);
        return showtime.getFilm_id();
    }

    public ShowtimeReponse updateShowtime(Long showtimeId, ShowtimeCreationRequest request) {
        Showtime showtime =
                showtimeRepository.findById(showtimeId).orElseThrow(() -> new RuntimeException("Showtime not found"));
        showtimeMapper.showtimeUpdate(showtime, request);
        return showtimeMapper.toShowtimeReponse(showtimeRepository.save(showtime));
    }

    public ShowtimeReponse getShowtime(Long showtimeId) {
        Showtime showtime =
                showtimeRepository.findById(showtimeId).orElseThrow(() -> new RuntimeException("Showtime not found"));
        return showtimeMapper.toShowtimeReponse(showtime);
    }
}
