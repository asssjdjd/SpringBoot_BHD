package com.bhd_star.web.controllers.category;

import com.bhd_star.web.dto.request.CategoryRequest;
import com.bhd_star.web.dto.request.UserUpdateRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.CategoryResponse;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.service.CategoryService;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorys")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class CategoryController {
    CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAllCategory() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .response(categoryService.getAllCategorys())
                .build();
    }

    @PostMapping
    public ApiResponse<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .response(categoryService.createCategory(request))
                .build();
    }

    @DeleteMapping("/{type}")
    public ApiResponse<String> deleteCateGory(@PathVariable String type) {
        categoryService.deleteCategory(type);
        return ApiResponse.<String>builder()
                .response("Type " + type + " has been deleted")
                .build();
    }

    @PutMapping("{type}")
    ApiResponse<CategoryResponse> updateUser(@PathVariable String type, @RequestBody CategoryRequest request) {
//        log.info("excuted this function updateUser");
        return ApiResponse.<CategoryResponse>builder()
                .response(categoryService.updateCategory(type,request))
                .build();
    }

    @GetMapping("/{type}")
    ApiResponse<CategoryResponse> getUser(@PathVariable String type) {
        return ApiResponse.<CategoryResponse>builder()
                .response(categoryService.getFilm(type))
                .build();
    }


}
