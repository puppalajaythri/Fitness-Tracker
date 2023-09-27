import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-workout-plans',
  templateUrl: './workout-plans.component.html',
  styleUrls: ['./workout-plans.component.css']
})
export class WorkoutPlansComponent implements OnInit {

  selectedLevel = '';
  name = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.selectedLevel = this.dataService.selectedLevel;
    this.name =  this.dataService.name;
    console.log(this.selectedLevel);
  }

}
