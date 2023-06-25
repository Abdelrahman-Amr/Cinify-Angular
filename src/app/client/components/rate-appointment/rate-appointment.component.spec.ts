import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAppointmentComponent } from './rate-appointment.component';

describe('RateAppointmentComponent', () => {
  let component: RateAppointmentComponent;
  let fixture: ComponentFixture<RateAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateAppointmentComponent]
    });
    fixture = TestBed.createComponent(RateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
