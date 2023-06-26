import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDataComponent } from './update-user-data.component';

describe('UpdateUserDataComponent', () => {
  let component: UpdateUserDataComponent;
  let fixture: ComponentFixture<UpdateUserDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserDataComponent]
    });
    fixture = TestBed.createComponent(UpdateUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
