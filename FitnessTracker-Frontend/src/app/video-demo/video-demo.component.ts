import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../data.service';


@Component({
  selector: 'app-video-demo',
  templateUrl: './video-demo.component.html',
  styleUrls: ['./video-demo.component.css']
})
export class VideoDemoComponent {

  workoutLevels: string[] = ['beginner', 'intermediate', 'advanced'];
  selectedWorkoutLevel: string = '';
  beginnerWorkoutOptions: string[] = ['Stationary Bike Workout', 'Walking Workout', 'Elliptical Workout', 'Total Body Strength', 'Total Body Strength Level 2', 'gentle yoga/stretching', 'Cardio'];
  intermediateWorkoutOptions: string[] = ['Cardio Medley Workout', 'Upper Body Training', 'Stretch', 'Treadmill Interval Workout', 'Core Training', 'Low Impact Cardio Blast Workout', 'Lower body strength', 'Cardio Endurance Workout'];
  advancedWorkoutOptions: string[] = ['Chest Shoulders', 'Lower Body and Core', 'Back and Biceps', 'Boredom Buster Cardio', 'Total Body Blast', 'HIIT Tabata Cardio Workout'];
  selectedWorkoutOption: string = '';
  selectedVideoUrl: SafeResourceUrl = '';

  name:string =  this.dataService.name;

  videoUrls: { [key: string]: { [key: string]: string } } = {
    beginner: {
      'Stationary Bike Workout': 'https://www.youtube.com/embed/rEqRmKAQ5xM?si=2sGiw3A6VKaWO_C8',
      'Walking Workout': 'https://www.youtube.com/embed/26_e1YWDLX8?si=hErcSysmM5hEwXH8',
      'Elliptical Workout': 'https://www.youtube.com/embed/xpfJKIvDZMg?si=hOfOJSlToBR7nipR',
      'Total Body Strength': 'https://www.youtube.com/embed/0hYDDsRjwks?si=_TLfn40sUGPcP-0s',
      'Total Body Strength Level 2': 'https://www.youtube.com/embed/WcZ1ZAtf9nY?si=_jQcp1JvUygZN2G6',
      'gentle yoga/stretching': 'https://www.youtube.com/embed/3HuwnAKdUUU?si=dziiX_whtn6tudcV',
      'Cardio': 'https://www.youtube.com/embed/PvEnWsPrL4w?si=cY5bD4Gkf6ld_AHO'
    },
    intermediate: {
      'Cardio Medley Workout': 'https://www.youtube.com/embed/yplP5cLuyf4?si=KQ-EAZmUmlt9usz9',
      'Upper Body Training': 'https://www.youtube.com/embed/SZaggsg2zUY?si=jJPjR2CctI0vuQm1',
      'Stretch': 'https://www.youtube.com/embed/baqAriam3l8?si=ZuyBcNsb8oIuZNLB',
      'Treadmill Interval Workout': 'https://www.youtube.com/embed/Kk4pt3y8clA?si=A0gid26B82r5nfIW',
      'Core Training': 'https://www.youtube.com/embed/dJlFmxiL11s?si=crKCOsxp5PKrqtck',
      'Low Impact Cardio Blast Workout': 'https://www.youtube.com/embed/Ba3qZjzPonI?si=mYtM6hyyy9w9lnhb',
      'Lower body strength': 'https://www.youtube.com/embed/RoAaV-iMcBk?si=goC-kg0spVH1QsyU',
      'Cardio Endurance Workout': 'https://www.youtube.com/embed/wLYeRlyyncY?si=RyzQr83AcLcbEMWs'
    },
    advanced: {
      'Chest Shoulders': 'https://www.youtube.com/embed/aWhEpIxqYhE?si=vRt8Il-9_IG914Rn',
      'Lower Body and Core': 'https://www.youtube.com/embed/y-uAqSyMbnQ?si=McGSXH9vDFphz5-h',
      'Back and Biceps': 'https://www.youtube.com/embed/zcnf-jNrvN0?si=3JuxmMKLQUXV7bpz',
      'Boredom Buster Cardio': 'https://www.youtube.com/embed/yplP5cLuyf4?si=Y3qXV8ABrRRbMxzw',
      'Total Body Blast': 'https://www.youtube.com/embed/l0gDqsSUtWo?si=U4ZtUZBqarT4GU4E',
      'HIIT Tabata Cardio Workout': 'https://www.youtube.com/embed/V4MqB6q3w44?si=8Ve8FZYsb2vPXS1O'
    }
  };

  ngOnInit() {
    this.selectedWorkoutLevel = this.dataService.selectedLevel;
  }

  constructor(private sanitizer: DomSanitizer, private dataService: DataService) {}

  loadVideo(): void {
    if (this.selectedWorkoutOption && this.selectedWorkoutLevel) {
      const videoUrl = this.videoUrls[this.selectedWorkoutLevel]?.[this.selectedWorkoutOption] || '';
      this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    } else {
      console.error('Both workout option and level must be selected.');
    }
  }
  
}