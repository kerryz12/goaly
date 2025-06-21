package com.goaly.backend.service;

import com.goaly.backend.dto.CreateGoalRequest;
import com.goaly.backend.dto.GoalDto;
import com.goaly.backend.dto.UpdateGoalRequest;
import com.goaly.backend.entity.Goal;
import com.goaly.backend.entity.Goal.GoalStatus;
import com.goaly.backend.entity.User;
import com.goaly.backend.exception.ResourceNotFoundException;
import com.goaly.backend.repository.GoalRepository;
import com.goaly.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    @Autowired
    public GoalServiceImpl(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    @Override
    public GoalDto createGoal(CreateGoalRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Goal goal = new Goal();
        goal.setTitle(request.getTitle());
        goal.setDescription(request.getDescription());
        goal.setTargetDate(request.getTargetDate());
        goal.setUser(user);

        Goal savedGoal = goalRepository.save(goal);
        return convertToDto(savedGoal);
    }

    @Override
    @Transactional(readOnly = true)
    public GoalDto getGoalById(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));
        return convertToDto(goal);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GoalDto> getGoalsByUserId(Long userId, Pageable pageable) {
        Page<Goal> goals = goalRepository.findByUserId(userId, pageable);
        return goals.map(this::convertToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GoalDto> getGoalsByUserIdAndStatus(Long userId, GoalStatus status) {
        List<Goal> goals = goalRepository.findByUserIdAndStatus(userId, status);
        return goals.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public GoalDto updateGoal(Long id, UpdateGoalRequest request) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));

        if (request.getTitle() != null) {
            goal.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            goal.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            goal.setStatus(request.getStatus());
            if (request.getStatus() == GoalStatus.COMPLETED) {
                goal.setCompletionDate(LocalDate.now());
            }
        }
        if (request.getTargetDate() != null) {
            goal.setTargetDate(request.getTargetDate());
        }

        Goal updatedGoal = goalRepository.save(goal);
        return convertToDto(updatedGoal);
    }

    @Override
    public void deleteGoal(Long id) {
        if (!goalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Goal not found with id: " + id);
        }
        goalRepository.deleteById(id);
    }

    @Override
    public GoalDto completeGoal(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));

        goal.setStatus(GoalStatus.COMPLETED);
        goal.setCompletionDate(LocalDate.now());

        Goal completedGoal = goalRepository.save(goal);
        return convertToDto(completedGoal);
    }

    @Override
    @Transactional(readOnly = true)
    public List<GoalDto> getUpcomingGoals(Long userId) {
        LocalDate nextWeek = LocalDate.now().plusWeeks(1);
        List<Goal> upcomingGoals = goalRepository.findUpcomingGoalsByUserId(userId, nextWeek);
        return upcomingGoals.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private GoalDto convertToDto(Goal goal) {
        GoalDto dto = new GoalDto();
        dto.setId(goal.getId());
        dto.setTitle(goal.getTitle());
        dto.setDescription(goal.getDescription());
        dto.setStatus(goal.getStatus());
        dto.setTargetDate(goal.getTargetDate());
        dto.setCompletionDate(goal.getCompletionDate());
        dto.setUserId(goal.getUser().getId());
        dto.setUserName(goal.getUser().getName());
        dto.setCreatedAt(goal.getCreatedAt());
        dto.setUpdatedAt(goal.getUpdatedAt());
        return dto;
    }
}
