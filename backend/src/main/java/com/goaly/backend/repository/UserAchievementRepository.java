package com.goaly.backend.repository;

import com.goaly.backend.entity.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    
    /**
     * Find all user achievements by user ID
     */
    List<UserAchievement> findByUserId(Long userId);
    
    /**
     * Find user achievements by user ID and achievement category
     */
    @Query("SELECT ua FROM UserAchievement ua JOIN ua.achievement a WHERE ua.userId = :userId AND a.category = :category")
    List<UserAchievement> findByUserIdAndAchievementCategory(@Param("userId") Long userId, @Param("category") String category);
    
    /**
     * Check if user has unlocked a specific achievement
     */
    Optional<UserAchievement> findByUserIdAndAchievementId(Long userId, Long achievementId);
    
    /**
     * Check if user has unlocked a specific achievement
     */
    boolean existsByUserIdAndAchievementId(Long userId, Long achievementId);
    
    /**
     * Get count of user's unlocked achievements
     */
    long countByUserId(Long userId);
    
    /**
     * Get total points earned by user
     */
    @Query("SELECT COALESCE(SUM(ua.achievement.points), 0) FROM UserAchievement ua WHERE ua.userId = :userId")
    Integer getTotalPointsByUserId(@Param("userId") Long userId);
    
    /**
     * Get user's unlocked achievement IDs
     */
    @Query("SELECT ua.achievement.id FROM UserAchievement ua WHERE ua.userId = :userId")
    List<Long> findAchievementIdsByUserId(@Param("userId") Long userId);
    
    /**
     * Get achievements unlocked by user, ordered by unlock date
     */
    List<UserAchievement> findByUserIdOrderByUnlockedAtDesc(Long userId);
}