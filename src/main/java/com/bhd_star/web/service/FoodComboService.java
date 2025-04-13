package com.bhd_star.web.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bhd_star.web.dto.request.FoodComboCreationRequest;
import com.bhd_star.web.dto.response.FoodComboResponse;
import com.bhd_star.web.entity.FoodCombo;
import com.bhd_star.web.exception.AppException;
import com.bhd_star.web.exception.ErrorCode;
import com.bhd_star.web.mapper.FoodComboMapper;
import com.bhd_star.web.repository.FoodComboRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FoodComboService {
    FoodComboRepository foodComboRepository;
    FoodComboMapper foodComboMapper;
    ObjectMapper objectMapper = new ObjectMapper();

    @PreAuthorize("hasRole('ADMIN')")
    public FoodComboResponse createFoodCombo(FoodComboCreationRequest request) throws IOException {
        // Tạo đối tượng ImgBBUploader để tải lên ảnh
        ImgBBUploader uploader = new ImgBBUploader();

        // Chuyển đổi request thành entity film
        FoodCombo foodCombo = foodComboMapper.toFoodCombo(request);

        List<String> imageUrls = new ArrayList<>();
        List<String> deleteUrls = new ArrayList<>();

        // Xử lý tải lên từng ảnh trong danh sách
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            for (MultipartFile file : request.getImages()) {
                if (!file.isEmpty()) {
                    try {
                        // Gọi API tải lên ảnh và nhận JSON response
                        String jsonResponse = uploader.uploadImage(file);
                        log.debug("JSON Response from ImgBB: {}", jsonResponse);

                        // Parse JSON response để lấy URL ảnh và URL xóa
                        JsonNode rootNode = objectMapper.readTree(jsonResponse);

                        if (rootNode.has("data")) {
                            String imageUrl = rootNode.path("data")
                                    .path("image")
                                    .path("url")
                                    .asText();
                            String deleteUrl =
                                    rootNode.path("data").path("delete_url").asText();

                            // Thêm vào danh sách
                            imageUrls.add(imageUrl);
                            deleteUrls.add(deleteUrl);
                        } else {
                            log.error("ImgBB response không chứa dữ liệu hợp lệ: {}", jsonResponse);
                        }
                    } catch (Exception e) {
                        log.error("Lỗi khi tải lên ảnh: {}", e.getMessage());
                        throw new AppException(ErrorCode.IMAGE_NOT_UPLOAD);
                    }
                }
            }
        }

        // Lưu URL ảnh và URL xóa vào film
        foodCombo.setImages(String.join(",", imageUrls));
//        foodCombo.setDeleteUrls(String.join(",", deleteUrls));

        // Lưu film vào database
        FoodCombo savedFoodCombo = foodComboRepository.save(foodCombo);

        // Chuyển đổi thành response
        FoodComboResponse foodComboResponse = foodComboMapper.toFoodComboResponse(savedFoodCombo);
        foodComboResponse.setImages(savedFoodCombo.getImages());

        return foodComboResponse;
    }


    public List<FoodComboResponse> getAllFoodCombos() {
        return foodComboRepository.findAll().stream()
                .map(foodComboMapper::toFoodComboResponse)
                .toList();
    }


    public FoodComboResponse getFoodComboById(Long foodComboId) {
        FoodCombo foodCombo = foodComboRepository
                .findById(foodComboId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy food combo với ID: " + foodComboId));

        return foodComboMapper.toFoodComboResponse(foodCombo);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public String deleteFoodCombo(Long foodComboId) {
        // Tìm film theo ID
        FoodCombo foodCombo =
                foodComboRepository.findById(foodComboId).orElseThrow(() -> new RuntimeException("Không tìm thấy "));

        String nameFoodCombo = foodCombo.getName();

        // Xử lý xóa ảnh trên ImgBB trước khi xóa record trong database
        //        String deleteUrlsString = foodCombo.getDeleteUrls();
        //
        //        if (deleteUrlsString != null && !deleteUrlsString.isEmpty()) {
        //            // Khởi tạo ImgBBUploader
        //            ImgBBUploader uploader = new ImgBBUploader();
        //
        //            // Phân tách các URL xóa
        //            List<String> deleteUrls = new ArrayList<>();
        //
        //            // Xử lý các trường hợp đặc biệt của chuỗi URL xóa
        //            if (deleteUrlsString.endsWith(",")) {
        //                deleteUrlsString = deleteUrlsString.substring(0, deleteUrlsString.length() - 1);
        //            }
        //
        //            if (deleteUrlsString.contains(",")) {
        //                String[] urls = deleteUrlsString.split(",");
        //                for (String url : urls) {
        //                    if (url != null && !url.trim().isEmpty()) {
        //                        deleteUrls.add(url.trim());
        //                    }
        //                }
        //            } else if (!deleteUrlsString.trim().isEmpty()) {
        //                deleteUrls.add(deleteUrlsString.trim());
        //            }
        //
        //            // Xóa từng ảnh trên ImgBB
        //            for (String deleteUrl : deleteUrls) {
        //                try {
        //                    log.debug("Đang xóa ảnh với URL: {}", deleteUrl);
        //                    uploader.deleteImage(deleteUrl);
        //                    log.debug("Đã xóa ảnh thành công");
        //                } catch (IOException e) {
        //                    // Log lỗi nhưng vẫn tiếp tục xóa các ảnh khác
        //                    log.error("Lỗi khi xóa ảnh {}: {}", deleteUrl, e.getMessage());
        //                }
        //            }
        //        }

        // Xóa film khỏi database
        foodComboRepository.deleteById(foodComboId);

        return nameFoodCombo;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public FoodComboResponse updateFoodCombo(Long foodComboId, FoodComboCreationRequest request) {
        FoodCombo foodCombo =
                foodComboRepository.findById(foodComboId).orElseThrow(() -> new RuntimeException("Không tìm thấy "));

        foodComboMapper.updateFoodCombo(foodCombo, request);
        ImgBBUploader uploader = new ImgBBUploader();
        List<String> imageUrls = new ArrayList<>();
        List<String> deleteUrls = new ArrayList<>();

        // Xử lý tải lên từng ảnh trong danh sách
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            for (MultipartFile file : request.getImages()) {
                if (!file.isEmpty()) {
                    try {
                        // Gọi API tải lên ảnh và nhận JSON response
                        String jsonResponse = uploader.uploadImage(file);
                        log.debug("JSON Response from ImgBB: {}", jsonResponse);

                        // Parse JSON response để lấy URL ảnh và URL xóa
                        JsonNode rootNode = objectMapper.readTree(jsonResponse);

                        if (rootNode.has("data")) {
                            String imageUrl = rootNode.path("data")
                                    .path("image")
                                    .path("url")
                                    .asText();
                            String deleteUrl =
                                    rootNode.path("data").path("delete_url").asText();

                            // Thêm vào danh sách
                            imageUrls.add(imageUrl);
                            deleteUrls.add(deleteUrl);
                        } else {
                            log.error("ImgBB response không chứa dữ liệu hợp lệ: {}", jsonResponse);
                        }
                    } catch (Exception e) {
                        log.error("Lỗi khi tải lên ảnh: {}", e.getMessage());
                    }
                }
            }
        }

        // Lưu URL ảnh và URL xóa vào film
        foodCombo.setImages(String.join(",", imageUrls));
//        foodCombo.setDeleteUrls(String.join(",", deleteUrls));

        return foodComboMapper.toFoodComboResponse(foodComboRepository.save(foodCombo));
    }
    @PreAuthorize("hasRole('ADMIN')")
    public FoodComboResponse showFoodCombo(Long foodComboId) {
        FoodCombo foodCombo =
                foodComboRepository.findById(foodComboId).orElseThrow(() -> new RuntimeException("Film not found"));
        return foodComboMapper.toFoodComboResponse(foodCombo);
    }

    // Có thể thêm các phương thức khác như updateFilm, deleteOneImage, v.v.
}
