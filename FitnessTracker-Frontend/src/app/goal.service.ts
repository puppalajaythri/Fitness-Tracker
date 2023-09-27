import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private baseUrl = 'http://localhost:8080/api'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  setWeeklyGoal(email: string, weeklyGoal: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/goal-settings/${email}`, { weeklyGoal });
  }

  getUserGoals(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/goal-settings/${email}`);
  }

  recordDailySteps(dailySteps: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/steps`, { dailySteps });
  }

  addToHistory(historyEntry: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/history`, { historyEntry });
  }
}
