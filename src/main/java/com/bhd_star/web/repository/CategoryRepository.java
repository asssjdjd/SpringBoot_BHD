package com.bhd_star.web.repository;

import com.bhd_star.web.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,String> {
    @Modifying
    @Query("DELETE FROM Category c WHERE c.type = :type")
    void deleteByType(@Param("type") String type);

    Optional<Category> findByType(String type);

}
