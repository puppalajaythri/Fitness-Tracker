package com.fitnesstracker.FitnessTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableAutoConfiguration(exclude = {
//	    DataSourceAutoConfiguration.class,
//	    DataSourceTransactionManagerAutoConfiguration.class,
//	    HibernateJpaAutoConfiguration.class})
public class FitnessTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnessTrackerApplication.class, args);
	}

}
