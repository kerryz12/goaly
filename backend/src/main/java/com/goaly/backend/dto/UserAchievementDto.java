package com.goaly.backend.dto;

import java.time.LocalDateTime;

public class UserAchievementDto {

    private Long id;
    private Long userId;
    private AchievementDto achievement;
    private String status; // "unlocked", "locked", "hidden"
    private LocalDateTime unlockedAt;
    private LocalDateTime createdAt;

    // Constructors
    public UserAchievementDto() {
    }

    public UserAchievementDto(Long id, Long userId, AchievementDto achievement,
            String status, LocalDateTime unlockedAt, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.achievement = achievement;
        this.status = status;
        this.unlockedAt = unlockedAt;
        this.createdAt = createdAt;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public AchievementDto getAchievement() {
        return achievement;
    }

    public void setAchievement(AchievementDto achievement) {
        this.achievement = achievement;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getUnlockedAt() {
        return unlockedAt;
    }

    public void setUnlockedAt(LocalDateTime unlockedAt) {
        this.unlockedAt = unlockedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
