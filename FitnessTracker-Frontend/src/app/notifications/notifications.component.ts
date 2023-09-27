import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationsData: string[] = [];
  email: string = this.dataService.email;
  name = this.dataService.name;

  constructor(private http: HttpClient,private dataService: DataService) {}
  ngOnInit(): void {
    this.http.get<any>(`http://localhost:8080/api/notifications/${this.email}`)
      .subscribe(
        (response) => {
          console.log("response",response);
          this.notificationsData = response;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      ); 
  }

  clear(){
    this.http.delete(`http://localhost:8080/api/del-notifications/${this.email}`)
    .subscribe(
      () => {
        console.log('Record deleted successfully.');
      },
      (error) => {
        console.error('Error deleting record:', error);
      }
    );
    this.notificationsData = [];
  }

}
