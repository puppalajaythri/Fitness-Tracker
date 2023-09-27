package com.fitnesstracker.FitnessTracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitnesstracker.FitnessTracker.entity.Notifications;

public interface NotificationsRepository extends JpaRepository<Notifications, Long>{
	
	List<Notifications> findByUserEmail(String email);

	void deleteByUserEmail(String email);
}
