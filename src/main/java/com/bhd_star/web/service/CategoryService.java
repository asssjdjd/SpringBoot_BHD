package com.bhd_star.web.service;

import com.bhd_star.web.dto.request.CategoryRequest;
import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.response.CategoryResponse;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.entity.Category;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.mapper.CategoryMapper;
import com.bhd_star.web.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CategoryService {
    private final CategoryMapper categoryMapper;

    CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategorys() {
       List<Category> categorys =  categoryRepository.findAll();
       return categorys.stream()
               .map(categoryMapper::toCategoryResponse).toList();
    }



    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = categoryMapper.toCatogry(request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Transactional
    public void deleteCategory(String type) {
        Category type_name = categoryRepository.findByType(type)
                .orElseThrow(() -> new RuntimeException("Not found Type"));
        categoryRepository.deleteByType(type);
    }

    public CategoryResponse updateCategory(String type,CategoryRequest request) {
        Category category = categoryRepository.findByType(type)
                .orElseThrow(() -> new RuntimeException("Not found Type"));
        categoryMapper.updateCategory(category,request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

}
