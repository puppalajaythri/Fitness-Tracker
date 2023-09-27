import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackActivityComponent } from './track-activity.component';

describe('TrackActivityComponent', () => {
  let component: TrackActivityComponent;
  let fixture: ComponentFixture<TrackActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackActivityComponent]
    });
    fixture = TestBed.createComponent(TrackActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
