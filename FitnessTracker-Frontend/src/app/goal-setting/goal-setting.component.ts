import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-goal-setting',
  templateUrl: './goal-setting.component.html',
  styleUrls: ['./goal-setting.component.css']
})
export class GoalSettingComponent implements OnInit {
  
  weeklyGoal: number = 0;
  tmpWeeklyGoal: number = 0;
  dailySteps: number = 0;
  totalStepsToday: number = 0;
  kilometersWalkedToday: number = 0;
  caloriesBurnedToday: number = 0;
  goalAchieved: boolean = false;
  editable: boolean = false;
  selectedLevel = '';
  flag: boolean = false;
  name = this.dataService.name;
  isGoalSet: boolean = true;

  goalHistory: string[] = [];
  stepsTracker: string[] = [];

  constructor(private http: HttpClient,private dataService: DataService) {}

  setLevel() {
    this.dataService.selectedLevel = this.selectedLevel;
  }

  email: string = this.dataService.email;

  ngOnInit() { 
    console.log(this.weeklyGoal);
    if(this.isGoalSet){
      this.fetchUserData();
    }
    this.selectedLevel = this.dataService.dropdownState;
  }

  getGoalHistory(){
    this.http.get<any>(`http://localhost:8080/api/history/${this.email}`)
      .subscribe(
        (response) => {
          console.log("response",response);
          if(response!=null){
              this.flag = true;
           if(response.historyEntry != null){
             this.goalHistory = (response.historyEntry.substring(0, response.historyEntry.length).split(";,"));
             for(let i=0; i < this.goalHistory.length;i++){
              this.goalHistory[i] += ";"; 
             }
           }
           if(response.stepsTracker != null){
            this.stepsTracker = (response.stepsTracker.substring(0, response.stepsTracker.length).split("....,"));
            for(let i=0; i < this.stepsTracker.length;i++){
             this.stepsTracker[i] += "...."; 
            }
          }
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
  }

  fetchUserData() {
    this.http.get<any>(`http://localhost:8080/api/history/${this.email}`)
      .subscribe(
        (response) => {
          console.log("response",response);
          if(response!=null){
              this.flag = true;
           if(response.historyEntry != null){
             this.goalHistory = (response.historyEntry.substring(0, response.historyEntry.length).split(";,"));
             for(let i=0; i < this.goalHistory.length;i++){
              this.goalHistory[i] += ";"; 
             }
           }
           if(response.stepsTracker != null){
            this.stepsTracker = (response.stepsTracker.substring(0, response.stepsTracker.length).split("....,"));
            for(let i=0; i < this.stepsTracker.length;i++){
             this.stepsTracker[i] += "...."; 
            }
          }
          this.totalStepsToday = response.steps;
          this.weeklyGoal = response.weeklyGoal;
          this.kilometersWalkedToday = this.totalStepsToday / 1250;
          this.caloriesBurnedToday = this.totalStepsToday * 0.05;
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
  }

  async enterDailySteps() {
    if(this.weeklyGoal==0){
      alert("Provide weekly goal");
    }
    else{
      const stepsActivity = `Steps : ${this.dailySteps} added on "${this.getDate()}"....`;
      this.stepsTracker.unshift(stepsActivity);
      this.http.put<any>(`http://localhost:8080/api/steps-tracker/${this.email}`,{"stepsTracker" :this.stepsTracker.toString()})
      .subscribe(
        (response) => {
        },
        (error) => {
          console.error('Error setting goal:', error);
        }
      );
      await new Promise(f => setTimeout(f, 700));
    if (this.dailySteps >= 0) {
      this.totalStepsToday += this.dailySteps;

      this.kilometersWalkedToday = this.totalStepsToday / 1250;
      this.caloriesBurnedToday = this.totalStepsToday * 0.05;
      
      if (this.totalStepsToday >= this.weeklyGoal) {
        this.goalAchieved = true;
      }
    }

    this.http.put<any>(`http://localhost:8080/api/steps/${this.email}`, { dailySteps: this.dailySteps }).subscribe(
      (response) => {
        console.log('Steps recorded successfully:', response);
      },
      (error) => {
        console.error('Error recording steps:', error);
      }
    );
    await new Promise(f => setTimeout(f, 700));
    }
  }

  async setWeeklyGoal() {
    if(this.weeklyGoal <= 0){
      alert("Goal is not correct");
    }
    else{
      this.tmpWeeklyGoal = this.weeklyGoal;
      this.editable = true;
      if(!this.flag){
        this.http.post<any>(`http://localhost:8080/api/goal-settings/${this.email}`,{"weeklyGoal" :this.weeklyGoal})
          .subscribe(
            (response) => {
              console.log('Weekly goal set successfully:', response);
            },
            (error) => {
              console.error('Error setting goal:', error);
            }
          );
          await new Promise(f => setTimeout(f, 700));
          this.addGoalTrack();
        }
        else{
          console.log("This is in put");
          this.http.put<any>(`http://localhost:8080/api/goal-settings-ready/${this.email}`,{"weeklyGoal" :this.weeklyGoal})
      .subscribe(
        (response) => {
          
        },
        (error) => {
          console.error('Error setting goal:', error);
        }
      );
      await new Promise(f => setTimeout(f, 700));
      this.addGoalTrack();
        }
    }
    this.totalStepsToday = 0;
    this.http.put<any>(`http://localhost:8080/api/steps/${this.email}`, { dailySteps: this.dailySteps }).subscribe(
      (response) => {
        console.log('Steps recorded successfully:', response);
      },
      (error) => {
        console.error('Error recording steps:', error);
      }
    );
    this.getGoalHistory();
  }

  async addToHistoryAndSetNewGoal() {
    if (this.goalAchieved) {
      const historyEntry = `Goal : ${this.weeklyGoal} steps, Achieved: ${this.totalStepsToday} steps, ${this.kilometersWalkedToday.toFixed(2)} km, ${this.caloriesBurnedToday.toFixed(2)} calories burned;`;
      this.goalHistory.unshift(historyEntry);
      
      this.http.put<Object>(`http://localhost:8080/api/history/${this.email}`,{"goalHistory" :this.goalHistory.toString()})
      .subscribe(
        (response) => {
          console.log('Weekly goal set successfully:', this.goalHistory.toString());
        },
        (error) => {
          console.error('Error setting goal:', error);
        }
      );
      await new Promise(f => setTimeout(f, 700));
      this.getGoalHistory();

      this.weeklyGoal = 0;
      this.goalAchieved = false;
      this.dailySteps = 0;
      this.totalStepsToday = 0;
      this.kilometersWalkedToday = 0;
      this.caloriesBurnedToday = 0;
      this.editable = false;
      this.isGoalSet = false;
    }
  }

  saveDropdownState() {
    this.dataService.dropdownState = this.selectedLevel;
  }

  async addGoalTrack(){
    await new Promise(f => setTimeout(f, 700));
    const stepsActivity = `Goal : ${this.weeklyGoal} added on "${this.getDate()}"....`;
        this.stepsTracker.unshift(stepsActivity);
        this.http.put<any>(`http://localhost:8080/api/steps-tracker/${this.email}`,{"stepsTracker" :this.stepsTracker.toString()})
      .subscribe(
        (response) => {
        },
        (error) => {
          console.error('Error setting goal:', error);
        }
      );
  }

  onLevelChange(){
    this.saveDropdownState();
    this.setLevel();
  }

  getDate(): string {
    let dateTime = new Date()
    return dateTime.toString().substring(0,25);
  }

}
