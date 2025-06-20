package com.goaly.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goaly.backend.controller.AchievementController.CreateAchievementRequest;
import com.goaly.backend.controller.AchievementController.UpdateAchievementRequest;
import com.goaly.backend.dto.AchievementDto;
import com.goaly.backend.dto.UserAchievementDto;
import com.goaly.backend.entity.Achievement;
import com.goaly.backend.entity.Goal;
import com.goaly.backend.entity.UserAchievement;
import com.goaly.backend.exception.ResourceNotFoundException;
import com.goaly.backend.repository.AchievementRepository;
import com.goaly.backend.repository.GoalRepository;
import com.goaly.backend.repository.UserAchievementRepository;

@Service
@Transactional
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final GoalRepository goalRepository;

    @Autowired
    public AchievementService(AchievementRepository achievementRepository,
            UserAchievementRepository userAchievementRepository,
            GoalRepository goalRepository) {
        this.achievementRepository = achievementRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.goalRepository = goalRepository;
    }

    /**
     * Get all achievements with optional category filtering
     */
    public Page<AchievementDto> getAllAchievements(Pageable pageable, String category) {
        Page<Achievement> achievements;
        if (category != null && !category.trim().isEmpty()) {
            achievements = achievementRepository.findByCategory(category, pageable);
        } else {
            achievements = achievementRepository.findAll(pageable);
        }
        return achievements.map(this::convertToDto);
    }

    /**
     * Get achievement by ID
     */
    public AchievementDto getAchievementById(Long id) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));
        return convertToDto(achievement);
    }

    /**
     * Get user's achievement progress (all achievements with status)
     */
    public List<UserAchievementDto> getUserAchievements(Long userId) {
        List<Achievement> allAchievements = achievementRepository.findAll();
        List<Long> unlockedAchievementIds = userAchievementRepository.findAchievementIdsByUserId(userId);
        List<UserAchievement> userAchievements = userAchievementRepository.findByUserId(userId);

        Map<Long, UserAchievement> userAchievementMap = userAchievements.stream()
                .collect(Collectors.toMap(ua -> ua.getAchievement().getId(), ua -> ua));

        return allAchievements.stream()
                .map(achievement -> {
                    String status;
                    UserAchievement userAchievement = userAchievementMap.get(achievement.getId());
                    LocalDateTime unlockedAt = null;
                    Long userAchievementId = null;

                    if (unlockedAchievementIds.contains(achievement.getId())) {
                        status = "unlocked";
                        if (userAchievement != null) {
                            unlockedAt = userAchievement.getUnlockedAt();
                            userAchievementId = userAchievement.getId();
                        }
                    } else if (achievement.getIsHidden()) {
                        status = "hidden";
                    } else {
                        status = "locked";
                    }

                    return new UserAchievementDto(
                            userAchievementId,
                            userId,
                            convertToDto(achievement),
                            status,
                            unlockedAt,
                            userAchievement != null ? userAchievement.getCreatedAt() : null
                    );
                })
                .collect(Collectors.toList());
    }

    /**
     * Get user's unlocked achievements only
     */
    public List<UserAchievementDto> getUserUnlockedAchievements(Long userId) {
        List<UserAchievement> userAchievements = userAchievementRepository.findByUserIdOrderByUnlockedAtDesc(userId);
        return userAchievements.stream()
                .map(ua -> new UserAchievementDto(
                ua.getId(),
                ua.getUserId(),
                convertToDto(ua.getAchievement()),
                "unlocked",
                ua.getUnlockedAt(),
                ua.getCreatedAt()
        ))
                .collect(Collectors.toList());
    }

    /**
     * Get user's achievements by category
     */
    public List<UserAchievementDto> getUserAchievementsByCategory(Long userId, String category) {
        List<Achievement> categoryAchievements = achievementRepository.findByCategory(category);
        List<Long> unlockedAchievementIds = userAchievementRepository.findAchievementIdsByUserId(userId);
        List<UserAchievement> userAchievements = userAchievementRepository.findByUserIdAndAchievementCategory(userId, category);

        Map<Long, UserAchievement> userAchievementMap = userAchievements.stream()
                .collect(Collectors.toMap(ua -> ua.getAchievement().getId(), ua -> ua));

        return categoryAchievements.stream()
                .map(achievement -> {
                    String status;
                    UserAchievement userAchievement = userAchievementMap.get(achievement.getId());
                    LocalDateTime unlockedAt = null;
                    Long userAchievementId = null;

                    if (unlockedAchievementIds.contains(achievement.getId())) {
                        status = "unlocked";
                        if (userAchievement != null) {
                            unlockedAt = userAchievement.getUnlockedAt();
                            userAchievementId = userAchievement.getId();
                        }
                    } else if (achievement.getIsHidden()) {
                        status = "hidden";
                    } else {
                        status = "locked";
                    }

                    return new UserAchievementDto(
                            userAchievementId,
                            userId,
                            convertToDto(achievement),
                            status,
                            unlockedAt,
                            userAchievement != null ? userAchievement.getCreatedAt() : null
                    );
                })
                .collect(Collectors.toList());
    }

    /**
     * Get user's achievement statistics
     */
    public Map<String, Object> getUserAchievementStats(Long userId) {
        long totalAchievements = achievementRepository.count();
        long unlockedCount = userAchievementRepository.countByUserId(userId);
        Integer totalPoints = userAchievementRepository.getTotalPointsByUserId(userId);

        // Get category breakdown
        List<String> categories = achievementRepository.findDistinctCategories();
        Map<String, Long> categoryStats = new HashMap<>();

        for (String category : categories) {
            List<UserAchievement> categoryAchievements = userAchievementRepository.findByUserIdAndAchievementCategory(userId, category);
            categoryStats.put(category, (long) categoryAchievements.size());
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAchievements", totalAchievements);
        stats.put("unlockedCount", unlockedCount);
        stats.put("lockedCount", totalAchievements - unlockedCount);
        stats.put("totalPoints", totalPoints != null ? totalPoints : 0);
        stats.put("completionPercentage", totalAchievements > 0 ? (double) unlockedCount / totalAchievements * 100 : 0);
        stats.put("categoryBreakdown", categoryStats);

        return stats;
    }

    /**
     * Check and unlock achievements for a user based on their current progress
     */
    public List<UserAchievementDto> checkAndUnlockAchievements(Long userId) {
        List<UserAchievementDto> newlyUnlocked = new ArrayList<>();
        List<Achievement> allAchievements = achievementRepository.findAll();
        List<Long> unlockedAchievementIds = userAchievementRepository.findAchievementIdsByUserId(userId);

        for (Achievement achievement : allAchievements) {
            if (!unlockedAchievementIds.contains(achievement.getId())) {
                if (checkAchievementCriteria(userId, achievement)) {
                    UserAchievementDto newAchievement = unlockAchievementForUser(userId, achievement.getId());
                    newlyUnlocked.add(newAchievement);
                }
            }
        }

        return newlyUnlocked;
    }

    /**
     * Manually unlock an achievement for a user
     */
    public UserAchievementDto unlockAchievementForUser(Long userId, Long achievementId) {
        // Check if already unlocked
        if (userAchievementRepository.existsByUserIdAndAchievementId(userId, achievementId)) {
            throw new IllegalStateException("Achievement already unlocked for user");
        }

        Achievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + achievementId));

        UserAchievement userAchievement = new UserAchievement(userId, achievement);
        userAchievement = userAchievementRepository.save(userAchievement);

        return new UserAchievementDto(
                userAchievement.getId(),
                userId,
                convertToDto(achievement),
                "unlocked",
                userAchievement.getUnlockedAt(),
                userAchievement.getCreatedAt()
        );
    }

    /**
     * Create new achievement
     */
    public AchievementDto createAchievement(CreateAchievementRequest request) {
        Achievement achievement = new Achievement(
                request.getName(),
                request.getDescription(),
                request.getCriteria(),
                request.getIcon(),
                request.getPoints(),
                request.getCategory(),
                request.getIsHidden()
        );

        achievement = achievementRepository.save(achievement);
        return convertToDto(achievement);
    }

    /**
     * Update achievement
     */
    public AchievementDto updateAchievement(Long id, UpdateAchievementRequest request) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));

        if (request.getName() != null) {
            achievement.setName(request.getName());
        }
        if (request.getDescription() != null) {
            achievement.setDescription(request.getDescription());
        }
        if (request.getCriteria() != null) {
            achievement.setCriteria(request.getCriteria());
        }
        if (request.getIcon() != null) {
            achievement.setIcon(request.getIcon());
        }
        if (request.getPoints() != null) {
            achievement.setPoints(request.getPoints());
        }
        if (request.getCategory() != null) {
            achievement.setCategory(request.getCategory());
        }
        if (request.getIsHidden() != null) {
            achievement.setIsHidden(request.getIsHidden());
        }

        achievement = achievementRepository.save(achievement);
        return convertToDto(achievement);
    }

    /**
     * Delete achievement
     */
    public void deleteAchievement(Long id) {
        if (!achievementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Achievement not found with id: " + id);
        }
        achievementRepository.deleteById(id);
    }

    /**
     * Get all achievement categories
     */
    public List<String> getAchievementCategories() {
        return achievementRepository.findDistinctCategories();
    }

    /**
     * Check if user meets criteria for a specific achievement
     */
    private boolean checkAchievementCriteria(Long userId, Achievement achievement) {
        List<Goal> userGoals = goalRepository.findByUserId(userId);
        List<Goal> completedGoals = userGoals.stream()
                .filter(goal -> Goal.GoalStatus.COMPLETED.equals(goal.getStatus()))
                .collect(Collectors.toList());

        switch (achievement.getName()) {
            case "First Steps":
                return !userGoals.isEmpty();

            case "Goal Crusher":
                return !completedGoals.isEmpty();

            case "Overachiever":
                return completedGoals.size() >= 10;

            case "Century Club":
                return completedGoals.size() >= 100;

            case "Planning Pro":
                return userGoals.stream()
                        .filter(goal -> goal.getTargetDate() != null)
                        .count() >= 5;

            case "Priority Master":
                return completedGoals.stream()
                        .filter(goal -> Goal.GoalPriority.HIGH.equals(goal.getPriority()))
                        .count() >= 5;

            case "Speed Demon":
                return completedGoals.stream()
                        .anyMatch(goal -> goal.getCompletionDate() != null
                        && goal.getCreatedAt() != null
                        && ChronoUnit.HOURS.between(goal.getCreatedAt(), goal.getCompletionDate().atStartOfDay()) <= 24);

            case "Early Bird":
                return completedGoals.stream()
                        .anyMatch(goal -> goal.getCompletionDate() != null
                        && goal.getTargetDate() != null
                        && goal.getCompletionDate().isBefore(goal.getTargetDate()));

            case "Streak Master":
                return checkGoalStreak(completedGoals, 5);

            case "Consistency King":
                return checkWeeklyConsistency(completedGoals, 4);

            default:
                return false;
        }
    }

    /**
     * Check if user has completed goals in a streak
     */
    private boolean checkGoalStreak(List<Goal> completedGoals, int requiredStreak) {
        if (completedGoals.size() < requiredStreak) {
            return false;
        }

        // Sort by completion date
        List<Goal> sortedGoals = completedGoals.stream()
                .filter(goal -> goal.getCompletionDate() != null)
                .sorted(Comparator.comparing(Goal::getCompletionDate))
                .collect(Collectors.toList());

        if (sortedGoals.size() < requiredStreak) {
            return false;
        }

        // Check for consecutive completions (allowing some flexibility)
        int currentStreak = 1;
        for (int i = 1; i < sortedGoals.size(); i++) {
            LocalDate prevDate = sortedGoals.get(i - 1).getCompletionDate();
            LocalDate currentDate = sortedGoals.get(i).getCompletionDate();

            // Allow up to 7 days between completions to count as a streak
            if (ChronoUnit.DAYS.between(prevDate, currentDate) <= 7) {
                currentStreak++;
                if (currentStreak >= requiredStreak) {
                    return true;
                }
            } else {
                currentStreak = 1;
            }
        }

        return currentStreak >= requiredStreak;
    }

    /**
     * Check if user has completed at least one goal every week for the
     * specified number of weeks
     */
    private boolean checkWeeklyConsistency(List<Goal> completedGoals, int requiredWeeks) {
        if (completedGoals.isEmpty()) {
            return false;
        }

        // Get completion dates from the last requiredWeeks weeks
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusWeeks(requiredWeeks);

        List<LocalDate> recentCompletions = completedGoals.stream()
                .filter(goal -> goal.getCompletionDate() != null)
                .map(Goal::getCompletionDate)
                .filter(date -> !date.isBefore(startDate))
                .collect(Collectors.toList());

        if (recentCompletions.isEmpty()) {
            return false;
        }

        // Check if there's at least one completion in each of the last requiredWeeks weeks
        Set<Integer> weeksWithCompletions = new HashSet<>();
        for (LocalDate completionDate : recentCompletions) {
            long weeksBetween = ChronoUnit.WEEKS.between(completionDate, now);
            if (weeksBetween >= 0 && weeksBetween < requiredWeeks) {
                weeksWithCompletions.add((int) weeksBetween);
            }
        }

        return weeksWithCompletions.size() >= requiredWeeks;
    }

    /**
     * Convert Achievement entity to DTO
     */
    private AchievementDto convertToDto(Achievement achievement) {
        return new AchievementDto(
                achievement.getId(),
                achievement.getName(),
                achievement.getDescription(),
                achievement.getCriteria(),
                achievement.getIcon(),
                achievement.getPoints(),
                achievement.getCategory(),
                achievement.getIsHidden(),
                achievement.getCreatedAt(),
                achievement.getUpdatedAt()
        );
    }
}
