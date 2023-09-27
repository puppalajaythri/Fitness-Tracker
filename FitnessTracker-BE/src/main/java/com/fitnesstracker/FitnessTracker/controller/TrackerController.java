package com.fitnesstracker.FitnessTracker.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesstracker.FitnessTracker.entity.GoalInfo;
import com.fitnesstracker.FitnessTracker.entity.Notifications;
import com.fitnesstracker.FitnessTracker.entity.User;
import com.fitnesstracker.FitnessTracker.repository.GoalInfoRepository;
import com.fitnesstracker.FitnessTracker.repository.NotificationsRepository;
import com.fitnesstracker.FitnessTracker.repository.UserRepository;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class TrackerController {

    @Autowired
    private GoalInfoRepository goalInfoRepo;

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private NotificationsRepository notificationsRepo; 

    @PostMapping("/goal-settings/{email}")
    public GoalInfo setWeeklyGoal(@PathVariable String email, @RequestBody Map<String, Integer> request) {
        Integer weeklyGoal = request.get("weeklyGoal");
        User user = userRepo.findByEmail(email);
        if (user != null) {
            GoalInfo goalInfo = new GoalInfo();
            goalInfo.setWeeklyGoal(weeklyGoal);
            goalInfo.setUser(user);
            GoalInfo savedGoalInfo = goalInfoRepo.save(goalInfo);
            return savedGoalInfo;
        } else {
            return null;
        }
    }
    
    @PutMapping("/goal-settings-ready/{email}")
    public GoalInfo updateGoal(@PathVariable String email,@RequestBody Map<String, Integer> request) {
        Integer weeklyGoal = request.get("weeklyGoal");
        GoalInfo goalInfo1 = goalInfoRepo.findByUserEmail(email);
        goalInfo1.setWeeklyGoal(weeklyGoal);
        GoalInfo updateHistory = goalInfoRepo.save(goalInfo1);
        return updateHistory;
    }

    @PutMapping("/steps/{email}")
    public GoalInfo recordDailySteps(@PathVariable String email,@RequestBody Map<String, Integer> request) {
        Integer dailySteps = request.get("dailySteps");
        GoalInfo goalInfo1 = goalInfoRepo.findByUserEmail(email);
        goalInfo1.setSteps(dailySteps);
        GoalInfo updateHistory = goalInfoRepo.save(goalInfo1);
        return updateHistory;
    }

    @PutMapping("/history/{email}")
    public GoalInfo addToHistory(@PathVariable String email,@RequestBody Map<String, String> request) {
        String historyEntry = request.get("goalHistory");
        GoalInfo goalInfo1 = goalInfoRepo.findByUserEmail(email);
        goalInfo1.setHistoryEntry(historyEntry);
        GoalInfo updateHistory = goalInfoRepo.save(goalInfo1);
        return updateHistory;
    }
    
    @PutMapping("/steps-tracker/{email}")
    public GoalInfo addToTracker(@PathVariable String email,@RequestBody Map<String, String> request) {
        String stepsTracker = request.get("stepsTracker");
        GoalInfo goalInfo1 = goalInfoRepo.findByUserEmail(email);
        goalInfo1.setStepsTracker(stepsTracker);
        GoalInfo updateHistory = goalInfoRepo.save(goalInfo1);
        return updateHistory;
    }
    
    @GetMapping("/steps-tracker/{email}")
    public GoalInfo getTracker(@PathVariable String email,@RequestBody Map<String, String> request) {
    	GoalInfo goalInfo = goalInfoRepo.findByUserEmail(email);
        if(goalInfo.getStepsTracker() == null)
        	return null;
        return goalInfo;
    }
    
    @GetMapping("/history/{email}")
    public GoalInfo getHistory(@PathVariable String email) {
        GoalInfo goalInfo = goalInfoRepo.findByUserEmail(email);
        return goalInfo;
    }
    
    @GetMapping("/notifications/{email}")
    public List<String> getNotifications(@PathVariable String email) {
    	List<String> notifs = new ArrayList<>();
        List<Notifications> notifications = notificationsRepo.findByUserEmail(email);
        for(Notifications l : notifications) {
        	notifs.add(l.getNotifications());
        }
        return notifs;
    }
    
    @PostMapping("/notifications/{email}")
    public Notifications setNotifications(@PathVariable String email, @RequestBody Map<String, String> request) {
        String notifications = request.get("notifications");
        User user = userRepo.findByEmail(email);
        if (user != null) {
            Notifications notifs = new Notifications();
            notifs.setNotifications(notifications);
            notifs.setUser(user);
            Notifications savedGoalInfo = notificationsRepo.save(notifs);
            return savedGoalInfo;
        } else {
            return null;
        }
    }
    
    @Transactional
    @DeleteMapping("del-notifications/{email}")
    public void deleteRecordsByEmail(@PathVariable String email) {
        try {
            notificationsRepo.deleteByUserEmail(email);
          //  return "Records with email " + email + " deleted successfully.";
        } catch (Exception e) {
          //  return "An error occurred: " + e.getMessage();
        }
    }
    
}
