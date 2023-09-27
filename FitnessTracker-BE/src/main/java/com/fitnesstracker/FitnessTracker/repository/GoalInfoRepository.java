package com.fitnesstracker.FitnessTracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitnesstracker.FitnessTracker.entity.GoalInfo;
import com.fitnesstracker.FitnessTracker.entity.User;

public interface GoalInfoRepository extends JpaRepository<GoalInfo, Long> {

	GoalInfo findByUserEmail(String email);
	
}
