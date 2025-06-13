package com.goaly.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.goaly.backend.dto.CreateGoalRequest;
import com.goaly.backend.dto.GoalDto;
import com.goaly.backend.dto.UpdateGoalRequest;
import com.goaly.backend.entity.Goal.GoalStatus;

public interface GoalService {

    GoalDto createGoal(CreateGoalRequest request);

    GoalDto getGoalById(Long id);

    Page<GoalDto> getGoalsByUserId(Long userId, Pageable pageable);

    List<GoalDto> getGoalsByUserIdAndStatus(Long userId, GoalStatus status);

    GoalDto updateGoal(Long id, UpdateGoalRequest request);

    void deleteGoal(Long id);

    GoalDto completeGoal(Long id);

    List<GoalDto> getUpcomingGoals(Long userId);
}
