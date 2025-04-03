package com.bhd_star.web.controllers.foodcombo;

import com.bhd_star.web.dto.request.FilmCreationRequest;
import com.bhd_star.web.dto.request.FoodComboCreationRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.FilmResponse;
import com.bhd_star.web.dto.response.FoodComboResponse;
import com.bhd_star.web.service.FilmService;
import com.bhd_star.web.service.FoodComboService;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/foods")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Builder
@Slf4j
public class FoodComboController {
    FoodComboService foodComboService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<FoodComboResponse> createFood(@ModelAttribute FoodComboCreationRequest request) {
        try {
            return ApiResponse.<FoodComboResponse>builder()
                    .response(foodComboService.createFoodCombo(request))
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public ApiResponse<List<FoodComboResponse>> showAllFoods() {
        return ApiResponse.<List<FoodComboResponse>>builder()
                .response(foodComboService.getAllFoodCombos())
                .build();
    }

    @DeleteMapping("/{foodComboId}")
    public ApiResponse<String> deleteFood(@PathVariable Long foodComboId) {
        return ApiResponse.<String>builder()
                .response("Film " + foodComboService.deleteFoodCombo(foodComboId) + " has been deleted")
                .build();
    }

    @PutMapping(value = "/{foodComboId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<FoodComboResponse> updateFood(
            @PathVariable Long foodComboId, @ModelAttribute FoodComboCreationRequest request) {
        return ApiResponse.<FoodComboResponse>builder()
                .response(foodComboService.updateFoodCombo(foodComboId, request))
                .build();
    }

    @GetMapping("/{foodComboId}")
    ApiResponse<FoodComboResponse> showFood(@PathVariable Long foodComboId) {
        return ApiResponse.<FoodComboResponse>builder()
                .response(foodComboService.showFoodCombo(foodComboId))
                .build();
    }
}
