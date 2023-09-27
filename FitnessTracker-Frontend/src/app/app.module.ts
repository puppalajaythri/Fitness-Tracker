// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GoalSettingComponent } from './goal-setting/goal-setting.component';
import { WorkoutPlansComponent } from './workout-plans/workout-plans.component';
import { NutritionDietComponent } from './nutrition-diet/nutrition-diet.component';
import { TrackActivityComponent } from './track-activity/track-activity.component';
import { VideoDemoComponent } from './video-demo/video-demo.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GoalSettingComponent,
    WorkoutPlansComponent,
    NutritionDietComponent,
    TrackActivityComponent,
    VideoDemoComponent,
    NotificationsComponent
    // Add other components here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
