import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  constructor(private http: HttpClient,private userService: UserService, private router: Router) {}

  checkUserNotExists(): boolean {
    this.http.get<any>(`http://localhost:8080/api/history/${this.user.email}`)
      .subscribe(
        (response) => {
          if(response != null){
            alert('User already exists');
            return false;
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
      return true;
  }

  register(): void {
    if(!this.validateEmail(this.user.email)){
      alert("Wrong email");
    }
    else{
        this.userService.registerUser(this.user).subscribe((data: any) => {
          console.log(data);
          if(data == null){
            alert('User already exists');
          }
          else{
          console.log(data);
          }
          this.router.navigate(["/login"]);
        }
        );
      }
  }

  validateEmail(email: any): boolean {
    
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
}

}
