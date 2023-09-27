import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nutrition-diet',
  templateUrl: './nutrition-diet.component.html',
  styleUrls: ['./nutrition-diet.component.css']
})
export class NutritionDietComponent {

  selectedLevel: string = '';
  selectedGoal: string = '';
  name = '';
  nutritionPlan: string | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.name =  this.dataService.name;
    this.selectedLevel = this.dataService.selectedLevel;
    console.log(this.selectedLevel);
  }

  onLevelChange() {
  }

  onGoalChange() {
  }

}
