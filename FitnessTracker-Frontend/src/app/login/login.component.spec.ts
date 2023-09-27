import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [UserService], // Provide your service here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService); // Inject the UserService
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log in successfully', () => {
    const loginMessage = { name: 'Test User' }; // Mock the login response
    spyOn(userService, 'login').and.returnValue(of(loginMessage)); // Mock the login method
    spyOn(component['router'], 'navigateByUrl'); // Spy on router navigation

    component.email = 'test@example.com';
    component.password = 'password';
    component.login();

    expect(component.name).toEqual('Test User');
    expect(component.notifications.length).toBeGreaterThan(0);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/menu');
  });

  it('should handle login error', () => {
    spyOn(userService, 'login').and.returnValue(throwError('Error')); // Mock login error
    spyOn(console, 'error'); // Spy on console.error

    component.email = 'test@example.com';
    component.password = 'password';
    component.login();

    expect(console.error).toHaveBeenCalledWith('Error recording steps:', 'Error');
  });

  it('should format the date correctly', () => {
    const formattedDate = component.getDate();
    expect(formattedDate).toMatch(/^\w{3} \w{3} \d{2} \d{4}/); // Match the format "Mon Sep 27 2023"
  });

  // Add more test cases as needed to cover your component's functionality.
});
