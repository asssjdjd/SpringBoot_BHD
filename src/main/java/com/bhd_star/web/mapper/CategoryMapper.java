package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.bhd_star.web.dto.request.CategoryRequest;
import com.bhd_star.web.dto.response.CategoryResponse;
import com.bhd_star.web.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCatogry(CategoryRequest request);

    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(@MappingTarget Category category, CategoryRequest request);
}
