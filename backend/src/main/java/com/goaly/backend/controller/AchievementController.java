package com.goaly.backend.controller;

import com.goaly.backend.dto.AchievementDto;
import com.goaly.backend.dto.UserAchievementDto;
import com.goaly.backend.service.AchievementService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/achievements")
@CrossOrigin(origins = "*")
public class AchievementController {

    private final AchievementService achievementService;

    @Autowired
    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    // Get all achievements (for admin/system purposes)
    @GetMapping
    public ResponseEntity<Page<AchievementDto>> getAllAchievements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String category) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<AchievementDto> achievements = achievementService.getAllAchievements(pageable, category);
        return ResponseEntity.ok(achievements);
    }

    // Get achievement by ID
    @GetMapping("/{id}")
    public ResponseEntity<AchievementDto> getAchievementById(@PathVariable Long id) {
        AchievementDto achievement = achievementService.getAchievementById(id);
        return ResponseEntity.ok(achievement);
    }

    // Get user's achievement progress (unlocked, locked, hidden)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserAchievementDto>> getUserAchievements(@PathVariable Long userId) {
        List<UserAchievementDto> achievements = achievementService.getUserAchievements(userId);
        return ResponseEntity.ok(achievements);
    }

    // Get user's unlocked achievements only
    @GetMapping("/user/{userId}/unlocked")
    public ResponseEntity<List<UserAchievementDto>> getUserUnlockedAchievements(@PathVariable Long userId) {
        List<UserAchievementDto> achievements = achievementService.getUserUnlockedAchievements(userId);
        return ResponseEntity.ok(achievements);
    }

    // Get user's achievements by category
    @GetMapping("/user/{userId}/category/{category}")
    public ResponseEntity<List<UserAchievementDto>> getUserAchievementsByCategory(
            @PathVariable Long userId,
            @PathVariable String category) {
        List<UserAchievementDto> achievements = achievementService.getUserAchievementsByCategory(userId, category);
        return ResponseEntity.ok(achievements);
    }

    // Get user's achievement statistics
    @GetMapping("/user/{userId}/stats")
    public ResponseEntity<Map<String, Object>> getUserAchievementStats(@PathVariable Long userId) {
        Map<String, Object> stats = achievementService.getUserAchievementStats(userId);
        return ResponseEntity.ok(stats);
    }

    // Check and unlock achievements for a user (typically called after goal completion)
    @PostMapping("/user/{userId}/check")
    public ResponseEntity<List<UserAchievementDto>> checkAndUnlockAchievements(@PathVariable Long userId) {
        List<UserAchievementDto> newlyUnlocked = achievementService.checkAndUnlockAchievements(userId);
        return ResponseEntity.ok(newlyUnlocked);
    }

    // Manually unlock an achievement for a user (admin function)
    @PostMapping("/user/{userId}/unlock/{achievementId}")
    public ResponseEntity<UserAchievementDto> unlockAchievementForUser(
            @PathVariable Long userId,
            @PathVariable Long achievementId) {
        UserAchievementDto userAchievement = achievementService.unlockAchievementForUser(userId, achievementId);
        return new ResponseEntity<>(userAchievement, HttpStatus.CREATED);
    }

    // Create new achievement (admin function)
    @PostMapping
    public ResponseEntity<AchievementDto> createAchievement(@Valid @RequestBody CreateAchievementRequest request) {
        AchievementDto achievement = achievementService.createAchievement(request);
        return new ResponseEntity<>(achievement, HttpStatus.CREATED);
    }

    // Update achievement (admin function)
    @PutMapping("/{id}")
    public ResponseEntity<AchievementDto> updateAchievement(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAchievementRequest request) {
        AchievementDto achievement = achievementService.updateAchievement(id, request);
        return ResponseEntity.ok(achievement);
    }

    // Delete achievement (admin function)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long id) {
        achievementService.deleteAchievement(id);
        return ResponseEntity.noContent().build();
    }

    // Get achievement categories
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAchievementCategories() {
        List<String> categories = achievementService.getAchievementCategories();
        return ResponseEntity.ok(categories);
    }

    // Request DTOs
    public static class CreateAchievementRequest {

        @NotBlank(message = "Name is required")
        private String name;

        @NotBlank(message = "Description is required")
        private String description;

        @NotBlank(message = "Criteria is required")
        private String criteria;

        private String icon = "🏆";

        @NotNull(message = "Points is required")
        @PositiveOrZero(message = "Points must be zero or positive")
        private Integer points = 0;

        private String category;

        private Boolean isHidden = false;

        // Getters and setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getCriteria() {
            return criteria;
        }

        public void setCriteria(String criteria) {
            this.criteria = criteria;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public Integer getPoints() {
            return points;
        }

        public void setPoints(Integer points) {
            this.points = points;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public Boolean getIsHidden() {
            return isHidden;
        }

        public void setIsHidden(Boolean isHidden) {
            this.isHidden = isHidden;
        }
    }

    public static class UpdateAchievementRequest {

        private String name;
        private String description;
        private String criteria;
        private String icon;

        @PositiveOrZero(message = "Points must be zero or positive")
        private Integer points;

        private String category;
        private Boolean isHidden;

        // Getters and setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getCriteria() {
            return criteria;
        }

        public void setCriteria(String criteria) {
            this.criteria = criteria;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public Integer getPoints() {
            return points;
        }

        public void setPoints(Integer points) {
            this.points = points;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public Boolean getIsHidden() {
            return isHidden;
        }

        public void setIsHidden(Boolean isHidden) {
            this.isHidden = isHidden;
        }
    }
}
