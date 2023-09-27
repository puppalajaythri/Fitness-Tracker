import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-activity',
  templateUrl: './track-activity.component.html',
  styleUrls: ['./track-activity.component.css']
})
export class TrackActivityComponent implements OnInit{

  selectedOption: string = ''; 
  weeklyGoal: number = 0;
  dailySteps: number = 0;
  totalStepsToday: number = 0;
  kilometersWalkedToday: number = 0;
  caloriesBurnedToday: number = 0;
  goalAchieved: boolean = false;
  selectedLevel = '';

  goalHistory: string[] = [];
  stepsTracker: string[] = [];
  name = '';
  
  constructor(private http: HttpClient, private route: ActivatedRoute,private dataService: DataService) {}

  email: string = this.dataService.email;

  ngOnInit(){
    console.log(this.email);
    this.fetchUserAcheivements();
    this.selectedLevel = this.dataService.dropdownState;
    this.name =  this.dataService.name;
    this.totalStepsToday = 0;;
    this.kilometersWalkedToday = 0;
    this.caloriesBurnedToday = 0;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  showContent() {
    console.log('Selected Option:', this.selectedOption);
  }

  clearData(){
    this.http.put<Object>(`http://localhost:8080/api/steps-tracker/${this.email}`,{"stepsTracker" :""})
      .subscribe(
        (response) => {
          console.log('Weekly goal set successfully:', this.goalHistory.toString());
        },
        (error) => {
          console.error('Error setting goal:', error);
        }
      );
      this.stepsTracker = [];
  }

  fetchUserAcheivements() {
    this.http.get<any>(`http://localhost:8080/api/history/${this.email}`)
      .subscribe(
        (response) => {
          console.log(response);
          if(this.stepsTracker.length >= 1){
            this.stepsTracker = (response.stepsTracker.split("....,"));
            this.stepsTracker[this.stepsTracker.length-1] = '';
            console.log(this.stepsTracker);
          }
          else{
            this.stepsTracker = (response.stepsTracker.split("...."));
          }
          if(response.historyEntry!=null){
            this.goalHistory = (response.historyEntry.split(";,"));
            this.goalHistory[this.goalHistory.length-1] = this.goalHistory[this.goalHistory.length-1].substring(0,this.goalHistory[this.goalHistory.length-1].length-this.goalHistory.length)
          }
          this.totalStepsToday = response.steps;
          this.weeklyGoal = response.weeklyGoal;
          this.kilometersWalkedToday = this.totalStepsToday / 1250;
          this.caloriesBurnedToday = this.totalStepsToday * 0.05;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
  }
}
