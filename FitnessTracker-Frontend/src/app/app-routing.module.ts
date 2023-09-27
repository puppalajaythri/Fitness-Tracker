// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GoalSettingComponent } from './goal-setting/goal-setting.component';
import { WorkoutPlansComponent } from './workout-plans/workout-plans.component';
import { NutritionDietComponent } from './nutrition-diet/nutrition-diet.component';
import { TrackActivityComponent } from './track-activity/track-activity.component';
import { VideoDemoComponent } from './video-demo/video-demo.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '../login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: AppComponent, children: [
    { path: 'goal-setting', component: GoalSettingComponent },
    { path: 'workout-plans', component: WorkoutPlansComponent },
    { path: 'nutrition-diet', component: NutritionDietComponent },
    { path: 'track-activity', component: TrackActivityComponent },
    { path: 'video-demo', component: VideoDemoComponent },
    { path: 'notifications', component: NotificationsComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
