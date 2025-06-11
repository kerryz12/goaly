package com.goaly.backend.repository;

import com.goaly.backend.entity.Achievement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    /**
     * Find achievements by category with pagination
     */
    Page<Achievement> findByCategory(String category, Pageable pageable);

    /**
     * Find achievements by category without pagination
     */
    List<Achievement> findByCategory(String category);

    /**
     * Find all non-hidden achievements
     */
    List<Achievement> findByIsHiddenFalse();

    /**
     * Find achievements by category and hidden status
     */
    List<Achievement> findByCategoryAndIsHiddenFalse(String category);

    /**
     * Get distinct categories
     */
    @Query("SELECT DISTINCT a.category FROM Achievement a WHERE a.category IS NOT NULL ORDER BY a.category")
    List<String> findDistinctCategories();
}
