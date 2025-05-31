package com.goaly.backend.controller;

import com.goaly.backend.dto.CreateGoalRequest;
import com.goaly.backend.dto.GoalDto;
import com.goaly.backend.dto.UpdateGoalRequest;
import com.goaly.backend.entity.Goal.GoalStatus;
import com.goaly.backend.service.GoalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
@CrossOrigin(origins = "*")
public class GoalController {

    private final GoalService goalService;

    @Autowired
    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    public ResponseEntity<GoalDto> createGoal(@Valid @RequestBody CreateGoalRequest request) {
        GoalDto goal = goalService.createGoal(request);
        return new ResponseEntity<>(goal, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalDto> getGoalById(@PathVariable Long id) {
        GoalDto goal = goalService.getGoalById(id);
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<GoalDto>> getGoalsByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<GoalDto> goals = goalService.getGoalsByUserId(userId, pageable);
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<GoalDto>> getGoalsByUserIdAndStatus(
            @PathVariable Long userId,
            @PathVariable GoalStatus status) {
        List<GoalDto> goals = goalService.getGoalsByUserIdAndStatus(userId, status);
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/user/{userId}/upcoming")
    public ResponseEntity<List<GoalDto>> getUpcomingGoals(@PathVariable Long userId) {
        List<GoalDto> goals = goalService.getUpcomingGoals(userId);
        return ResponseEntity.ok(goals);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long id,
            @Valid @RequestBody UpdateGoalRequest request) {
        GoalDto goal = goalService.updateGoal(id, request);
        return ResponseEntity.ok(goal);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<GoalDto> completeGoal(@PathVariable Long id) {
        GoalDto goal = goalService.completeGoal(id);
        return ResponseEntity.ok(goal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }
}
