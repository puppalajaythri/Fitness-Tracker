package com.fitnesstracker.FitnessTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitnesstracker.FitnessTracker.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmail(String email);
}
