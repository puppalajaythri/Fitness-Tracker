package com.fitnesstracker.FitnessTracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Goal_Info")
public class GoalInfo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int weeklyGoal;
    
    private int steps;
    
    @Column(length=5000)
    private String historyEntry;
    
    @Column(length=5000)
    private String stepsTracker;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

	public GoalInfo(Long id, int weeklyGoal, String historyEntry, User user) {
		super();
		this.id = id;
		this.weeklyGoal = weeklyGoal;
		this.historyEntry = historyEntry;
		this.user = user;
	}

	public GoalInfo() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getWeeklyGoal() {
		return weeklyGoal;
	}

	public void setWeeklyGoal(int weeklyGoal) {
		this.weeklyGoal = weeklyGoal;
	}

	public String getHistoryEntry() {
		return historyEntry;
	}

	public void setHistoryEntry(String historyEntry) {
		this.historyEntry = historyEntry;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getSteps() {
		return steps;
	}

	public void setSteps(int steps) {
		this.steps = steps;
	}

	public String getStepsTracker() {
		return stepsTracker;
	}

	public void setStepsTracker(String stepsTracker) {
		this.stepsTracker = stepsTracker;
	}
	
}