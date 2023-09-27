// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  name = '';
  user: User = new User();
  notifications: string[] = [];
  
  constructor(private http: HttpClient,private userService: UserService, private router: Router,private dataService: DataService) {}
  
  setEmail() {
    this.dataService.email = this.email;
  }

  setName() {
    this.dataService.name = this.name;
  }

  login(): void {

    this.userService.login(this.email, this.password).subscribe(
      (login_message:any) => {
        if(login_message === null){
          console.log('Invalid Credentials');
          alert('Invalid Credentials');
        }
        else{
          this.name = login_message.name;
          console.log('Login successful');
          this.notifications.push(`You have successfully logged-in at the time - "${this.getDate()}"`);

          this.http.post<any>(`http://localhost:8080/api/notifications/${this.email}`, { "notifications": this.notifications.toString() }).subscribe(
      (response) => {
        
      },
      (error) => {
        console.error('Error recording steps:', error);
      }
    );
          console.log("in login",this.notifications);
          this.setEmail();
          this.setName();
          this.user = login_message;
          this.router.navigate(['/menu']);
        }
      }
    );
  }

  getDate(): string {
    let dateTime = new Date()
    return dateTime.toString().substring(0,25);
  }

}
