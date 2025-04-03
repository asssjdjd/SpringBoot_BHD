package com.bhd_star.web.controllers.bill;

import com.bhd_star.web.dto.request.BillCreationResquest;
import com.bhd_star.web.dto.request.UserCreationResquest;
import com.bhd_star.web.dto.request.UserUpdateRequest;
import com.bhd_star.web.dto.response.ApiResponse;
import com.bhd_star.web.dto.response.BillResponse;
import com.bhd_star.web.dto.response.UserResponse;
import com.bhd_star.web.service.BillService;
import com.bhd_star.web.service.UserService;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bill")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Builder
@Slf4j
public class BillController {

    BillService billService;

    @GetMapping
    ApiResponse<List<BillResponse>> getBills() {
        List<BillResponse> bills = billService.getAllBills();
        return ApiResponse.<List<BillResponse>>builder().response(bills).build();
    }

    @PostMapping
    ApiResponse<BillResponse> createBill(@RequestBody BillCreationResquest request) {
        return ApiResponse.<BillResponse>builder()
                .response(billService.createBill(request))
                .build();
    }

    @GetMapping("/{userId}")
    ApiResponse<List<BillResponse>> getBillByUser(@PathVariable String userId) {
        return ApiResponse.<List<BillResponse>>builder()
                .response(billService.getBillByOneUser(userId))
                .build();
    }
}
