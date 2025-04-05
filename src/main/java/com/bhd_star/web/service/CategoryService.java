package com.bhd_star.web.service;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.bhd_star.web.dto.request.CategoryRequest;
import com.bhd_star.web.dto.response.CategoryResponse;
import com.bhd_star.web.entity.Category;
import com.bhd_star.web.exception.AppException;
import com.bhd_star.web.exception.ErrorCode;
import com.bhd_star.web.mapper.CategoryMapper;
import com.bhd_star.web.repository.CategoryRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    private final CategoryMapper categoryMapper;

    CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategorys() {
        List<Category> categorys = categoryRepository.findAll();
        return categorys.stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse createCategory(CategoryRequest request) {
        String type = request.getType();
        if (categoryRepository.existsByType(type)) throw new AppException(ErrorCode.CATEGORY_TYPE_EXISTED);
        Category category = categoryMapper.toCatogry(request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Transactional
    public void deleteCategory(String type) {
        Category type_name = categoryRepository
                .findByType(type)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_TYPE_NOT_FOUND));
        categoryRepository.deleteByType(type);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public CategoryResponse updateCategory(String type, CategoryRequest request) {
        Category category = categoryRepository
                .findByType(type)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_TYPE_NOT_FOUND));
        categoryMapper.updateCategory(category, request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    public CategoryResponse getFilm(String type) {
        Category category = categoryRepository
                .findById(type)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_TYPE_NOT_FOUND));
        return categoryMapper.toCategoryResponse(category);
    }
}
