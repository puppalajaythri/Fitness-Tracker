import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDemoComponent } from './video-demo.component';

describe('VideoDemoComponent', () => {
  let component: VideoDemoComponent;
  let fixture: ComponentFixture<VideoDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoDemoComponent]
    });
    fixture = TestBed.createComponent(VideoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
