import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionDietComponent } from './nutrition-diet.component';

describe('NutritionDietComponent', () => {
  let component: NutritionDietComponent;
  let fixture: ComponentFixture<NutritionDietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionDietComponent]
    });
    fixture = TestBed.createComponent(NutritionDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
