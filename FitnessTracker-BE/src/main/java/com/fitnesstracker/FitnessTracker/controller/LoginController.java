package com.fitnesstracker.FitnessTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesstracker.FitnessTracker.entity.User;
import com.fitnesstracker.FitnessTracker.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/fitness-tracker")
public class LoginController {
	
	@Autowired
	public UserRepository userRepo;

	@PostMapping("/login")
	public User greetUser(@RequestParam String email, @RequestParam String password) {
		System.out.println("in login");
		User user = userRepo.findByEmail(email);
		if(user!=null) {
			if(email.equals(user.getEmail()) && password.equals(user.getPassword()))
				return user;
			}
		return null;
	}
	
	@GetMapping("register/users")
	public List<User> getAllEmployees(){
		return userRepo.findAll();
	}
	
	@PostMapping("register/users")
	public User createUser(@RequestBody User user) {
		if(userRepo.findByEmail(user.getEmail()) == null)
			return userRepo.save(user);
		return null;
	}
	
}
