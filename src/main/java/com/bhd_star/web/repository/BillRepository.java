package com.bhd_star.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bhd_star.web.entity.Bill;

public interface BillRepository extends JpaRepository<Bill, String> {
    @Query("SELECT b FROM Bill b WHERE b.user.id = :userId")
    List<Bill> getAllBillsByUserId(@Param("userId") String userId);
}
