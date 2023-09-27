import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPlansComponent } from './workout-plans.component';

describe('WorkoutPlansComponent', () => {
  let component: WorkoutPlansComponent;
  let fixture: ComponentFixture<WorkoutPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutPlansComponent]
    });
    fixture = TestBed.createComponent(WorkoutPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
