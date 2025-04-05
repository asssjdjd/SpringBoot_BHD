package com.bhd_star.web.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bhd_star.web.dto.request.TheaterCreationRequest;
import com.bhd_star.web.dto.response.TheaterResponse;
import com.bhd_star.web.entity.Theater;
import com.bhd_star.web.exception.AppException;
import com.bhd_star.web.exception.ErrorCode;
import com.bhd_star.web.mapper.TheaterMapper;
import com.bhd_star.web.repository.TheaterRepository;
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
public class TheaterService {

    TheaterRepository theaterRepository;
    TheaterMapper theaterMapper;

    ObjectMapper objectMapper = new ObjectMapper();


    public List<TheaterResponse> getAllTheaters() {
        return theaterRepository.findAll().stream()
                .map(theaterMapper::toTheaterResponse)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public TheaterResponse createTheater(TheaterCreationRequest request) {
        ImgBBUploader uploader = new ImgBBUploader();
        Theater theater = theaterMapper.toTheater(request);
        String name_theater = request.getName();
        if (theaterRepository.existsByName(name_theater)) throw new AppException(ErrorCode.THEATER_EXITED);

        List<String> imageUrls = new ArrayList<>();
        List<String> deleteUrls = new ArrayList<>();

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

        theater.setImages(String.join(",", imageUrls));
        theater.setDeleteUrls(String.join(",", deleteUrls));

        // Lưu theater vào database
        Theater savedTheater = theaterRepository.save(theater);

        // Chuyển đổi thành response
        TheaterResponse filmResponse = theaterMapper.toTheaterResponse(savedTheater);
        filmResponse.setImages(savedTheater.getImages());

        return filmResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTheater(Long theaterId) {
        // Tìm film theo ID
        Theater theater =
                theaterRepository.findById(theaterId).orElseThrow(() -> new AppException(ErrorCode.THEATER_NOT_FOUND));
        String nameTheater = theater.getName();

        // Xử lý xóa ảnh trên ImgBB trước khi xóa record trong database
        String deleteUrlsString = theater.getDeleteUrls();

        if (deleteUrlsString != null && !deleteUrlsString.isEmpty()) {
            // Khởi tạo ImgBBUploader
            ImgBBUploader uploader = new ImgBBUploader();

            // Phân tách các URL xóa
            List<String> deleteUrls = new ArrayList<>();

            // Xử lý các trường hợp đặc biệt của chuỗi URL xóa
            if (deleteUrlsString.endsWith(",")) {
                deleteUrlsString = deleteUrlsString.substring(0, deleteUrlsString.length() - 1);
            }

            if (deleteUrlsString.contains(",")) {
                String[] urls = deleteUrlsString.split(",");
                for (String url : urls) {
                    if (url != null && !url.trim().isEmpty()) {
                        deleteUrls.add(url.trim());
                    }
                }
            } else if (!deleteUrlsString.trim().isEmpty()) {
                deleteUrls.add(deleteUrlsString.trim());
            }

            // Xóa từng ảnh trên ImgBB
            for (String deleteUrl : deleteUrls) {
                try {
                    log.debug("Đang xóa ảnh với URL: {}", deleteUrl);
                    uploader.deleteImage(deleteUrl);
                    log.debug("Đã xóa ảnh thành công");
                } catch (IOException e) {
                    // Log lỗi nhưng vẫn tiếp tục xóa các ảnh khác
                    log.error("Lỗi khi xóa ảnh {}: {}", deleteUrl, e.getMessage());
                }
            }
        }

        theaterRepository.deleteById(theaterId);

        return nameTheater;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public TheaterResponse updateTheater(Long theaterId, TheaterCreationRequest request) {
        Theater theater =
                theaterRepository.findById(theaterId).orElseThrow(() -> new AppException(ErrorCode.THEATER_NOT_FOUND));

        theaterMapper.updateTheater(theater, request);
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
                        throw new AppException(ErrorCode.IMAGE_NOT_UPLOAD);
                    }
                }
            }
        }

        // Lưu URL ảnh và URL xóa vào film
        theater.setImages(String.join(",", imageUrls));
        theater.setDeleteUrls(String.join(",", deleteUrls));

        return theaterMapper.toTheaterResponse(theaterRepository.save(theater));
    }


    public TheaterResponse showTheater(Long theaterId) {
        Theater theater =
                theaterRepository.findById(theaterId).orElseThrow(() -> new AppException(ErrorCode.THEATER_NOT_FOUND));
        return theaterMapper.toTheaterResponse(theater);
    }
}
