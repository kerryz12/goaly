package com.goaly.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.goaly.backend.entity.Goal;
import com.goaly.backend.entity.Goal.GoalStatus;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByUserId(Long userId);

    Page<Goal> findByUserId(Long userId, Pageable pageable);

    List<Goal> findByUserIdAndStatus(Long userId, GoalStatus status);

    @Query("SELECT g FROM Goal g WHERE g.user.id = :userId AND g.targetDate <= :date AND g.status = 'ACTIVE'")
    List<Goal> findUpcomingGoalsByUserId(@Param("userId") Long userId, @Param("date") LocalDate date);

    long countByUserIdAndStatus(Long userId, GoalStatus status);
}
