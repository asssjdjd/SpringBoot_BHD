package com.bhd_star.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bhd_star.web.entity.Film;

@Repository
public interface FilmRepository extends JpaRepository<Film, String> {
    boolean existsByName(String name);
}
