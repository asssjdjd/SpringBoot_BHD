package com.bhd_star.web.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bhd_star.web.dto.request.FilmCreationRequest;
import com.bhd_star.web.dto.response.FilmResponse;
import com.bhd_star.web.entity.Film;
import com.bhd_star.web.exception.AppException;
import com.bhd_star.web.exception.ErrorCode;
import com.bhd_star.web.mapper.FilmMapper;
import com.bhd_star.web.repository.FilmRepository;
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
public class FilmService {
    FilmRepository filmRepository;
    FilmMapper filmMapper;
    ObjectMapper objectMapper = new ObjectMapper();

    @PreAuthorize("hasRole('ADMIN')")
    public FilmResponse createFilm(FilmCreationRequest request) throws IOException {
        // Tạo đối tượng ImgBBUploader để tải lên ảnh
        ImgBBUploader uploader = new ImgBBUploader();

        String name = request.getName().trim().toLowerCase();
        if (filmRepository.existsByName(name)) throw new AppException(ErrorCode.FILM_EXISTED);

        // Chuyển đổi request thành entity film
        Film film = filmMapper.toFilm(request);

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
        film.setImages(String.join(",", imageUrls));
        film.setDeleteUrls(String.join(",", deleteUrls));

        // Lưu film vào database
        Film savedFilm = filmRepository.save(film);

        // Chuyển đổi thành response
        FilmResponse filmResponse = filmMapper.toFilmResponse(savedFilm);
        filmResponse.setImages(savedFilm.getImages());

        return filmResponse;
    }

    public List<FilmResponse> getAllFilms() {
        return filmRepository.findAll().stream().map(filmMapper::toFilmResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public String deleteFilm(String filmId) {
        // Tìm film theo ID
        Film film = filmRepository.findById(filmId).orElseThrow(() -> new AppException(ErrorCode.FILM_NOT_FOUND));

        String nameFilm = film.getName();

        // Xử lý xóa ảnh trên ImgBB trước khi xóa record trong database
        //        String deleteUrlsString = film.getDeleteUrls();
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
        //                    throw new AppException(ErrorCode.IMAGE_NOT_UPLOAD);
        //                }
        //            }
        //        }

        // Xóa film khỏi database
        filmRepository.deleteById(filmId);

        return nameFilm;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public FilmResponse updateFilm(String filmId, FilmCreationRequest request) {
        Film film = filmRepository.findById(filmId).orElseThrow(() -> new AppException(ErrorCode.FILM_NOT_FOUND));

        filmMapper.updateFilm(film, request);
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
        film.setImages(String.join(",", imageUrls));
        film.setDeleteUrls(String.join(",", deleteUrls));

        return filmMapper.toFilmResponse(filmRepository.save(film));
    }

    public FilmResponse showFilm(String filmId) {
        Film film = filmRepository.findById(filmId).orElseThrow(() -> new AppException(ErrorCode.FILM_NOT_FOUND));
        return filmMapper.toFilmResponse(film);
    }

    // Có thể thêm các phương thức khác như updateFilm, deleteOneImage, v.v.
}
