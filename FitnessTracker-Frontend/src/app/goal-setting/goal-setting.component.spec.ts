import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalSettingComponent } from './goal-setting.component';

describe('GoalSettingComponent', () => {
  let component: GoalSettingComponent;
  let fixture: ComponentFixture<GoalSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalSettingComponent],
      // You may need to add other dependencies like HttpClient and DataService here.
    });

    fixture = TestBed.createComponent(GoalSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Write more test cases here to cover various component methods and behaviors.
  it('should set weeklyGoal when setWeeklyGoal is called', () => {
    component.weeklyGoal = 0;
    component.setWeeklyGoal();
    expect(component.weeklyGoal).toBeGreaterThan(0);
  });

  it('should update totalStepsToday when enterDailySteps is called', () => {
    const initialSteps = component.totalStepsToday;
    const dailySteps = 1000;
    component.dailySteps = dailySteps;
    component.enterDailySteps();
    expect(component.totalStepsToday).toBe(initialSteps + dailySteps);
  });

  it('should disable the button when editable is true', () => {
    component.editable = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });
});
