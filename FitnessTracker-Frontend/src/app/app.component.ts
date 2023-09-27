import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Fitness Tracker';

  selectedLevel = '';

  email: string = this.dataService.email;

  ngOnInit() {
    this.selectedLevel = this.dataService.selectedLevel;
    console.log(this.selectedLevel);
  }

  constructor(private route: ActivatedRoute,private dataService: DataService) {}

  isLoginRoute(): boolean {
    return this.route.snapshot.firstChild?.routeConfig?.path === 'login';
  }

  isRegisterRoute(): boolean {
    return this.route.snapshot.firstChild?.routeConfig?.path === 'register';
  }
  
  isMenuRoute(): boolean {
    return this.route.snapshot.firstChild?.routeConfig?.path === 'menu';
  }

}
