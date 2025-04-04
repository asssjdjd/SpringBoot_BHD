package com.bhd_star.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhd_star.web.dto.request.BillCreationResquest;
import com.bhd_star.web.dto.response.BillResponse;
import com.bhd_star.web.entity.Bill;
import com.bhd_star.web.entity.User;
import com.bhd_star.web.mapper.BillMapper;
import com.bhd_star.web.repository.BillRepository;
import com.bhd_star.web.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BillService {

    BillRepository billRepository;
    BillMapper billMapper;
    UserRepository userRepository;

    public List<BillResponse> getAllBills() {
        return billRepository.findAll().stream().map(billMapper::toBillResponse).toList();
    }

    public BillResponse createBill(BillCreationResquest request) {
        Bill bill = billMapper.toBill(request);
        String userId = request.getUser_id();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Not found User"));
        bill.setUser(user);
        return billMapper.toBillResponse(billRepository.save(bill));
    }

    public List<BillResponse> getBillByOneUser(String userId) {
        List<Bill> bills = billRepository.getAllBillsByUserId(userId);
        return bills.stream().map(billMapper::toBillResponse).toList();
    }
}
