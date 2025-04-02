package com.bhd_star.web.service;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

public class ImgBBUploader {
    private static final String IMGBB_API_URL = "https://api.imgbb.com/1/upload";
    private static final String API_KEY = "a53054828e6e747cd3c413a89972031e"; // Thay bằng API key của bạn

    public String uploadImage(MultipartFile file) throws IOException {
        RestTemplate restTemplate = new RestTemplate();

        // Chuẩn bị dữ liệu gửi lên
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("key", API_KEY);
        body.add("image", new HttpEntity<>(file.getBytes(), createHeaders(file.getOriginalFilename())));

        // Thiết lập header cho yêu cầu
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Gửi yêu cầu POST tới ImgBB
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response =
                restTemplate.exchange(IMGBB_API_URL, HttpMethod.POST, requestEntity, String.class);

        // Trả về phản hồi đầy đủ
        return response.getBody();
    }

    private HttpHeaders createHeaders(String filename) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("image", filename);
        return headers;
    }

    public void deleteImage(String deleteUrl) throws IOException {
        if (deleteUrl == null || deleteUrl.trim().isEmpty()) {
            throw new IOException("Delete URL is empty");
        }

        try {
            // Giải mã URL nếu đã được mã hóa
            String decodedUrl = URLDecoder.decode(deleteUrl, StandardCharsets.UTF_8.name());

            // Trích xuất delete_hash từ URL
            Pattern pattern = Pattern.compile("delete/([a-zA-Z0-9]+)");
            Matcher matcher = pattern.matcher(decodedUrl);

            if (matcher.find()) {
                String deleteHash = matcher.group(1);

                // Tạo request để xóa ảnh sử dụng delete_hash
                RestTemplate restTemplate = new RestTemplate();
                String deleteApiUrl = "https://api.imgbb.com/1/delete/" + deleteHash;

                MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
                body.add("key", API_KEY);

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

                HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
                ResponseEntity<String> response =
                        restTemplate.exchange(deleteApiUrl, HttpMethod.POST, requestEntity, String.class);

                if (response.getStatusCode() != HttpStatus.OK) {
                    throw new IOException("Failed to delete image on ImgBB. Status: " + response.getStatusCode());
                }
            } else {
                throw new IOException("Could not extract delete hash from URL: " + deleteUrl);
            }
        } catch (Exception e) {
            throw new IOException("Error deleting image: " + e.getMessage(), e);
        }
    }
}
