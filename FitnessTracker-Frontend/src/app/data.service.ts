import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  email: string = '';
  name = '';
  selectedLevel: string = '';
  dropdownState: any;
  notifications: string[] = [];

  constructor() {  }
}
