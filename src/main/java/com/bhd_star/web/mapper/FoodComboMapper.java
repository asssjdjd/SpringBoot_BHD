package com.bhd_star.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.bhd_star.web.dto.request.FoodComboCreationRequest;
import com.bhd_star.web.dto.response.FoodComboResponse;
import com.bhd_star.web.entity.FoodCombo;

@Mapper(componentModel = "spring")
public interface FoodComboMapper {
    @Mapping(target = "images", ignore = true)
    FoodCombo toFoodCombo(FoodComboCreationRequest request);

    //    @Mapping(target = "images", ignore = true)
    FoodComboResponse toFoodComboResponse(FoodCombo foodCombo);

    @Mapping(target = "images", ignore = true)
    void updateFoodCombo(@MappingTarget FoodCombo foodCombo, FoodComboCreationRequest request);
}
