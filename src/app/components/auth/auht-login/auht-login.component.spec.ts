import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuhtLoginComponent } from './auht-login.component';

describe('AuhtLoginComponent', () => {
  let component: AuhtLoginComponent;
  let fixture: ComponentFixture<AuhtLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuhtLoginComponent]
    });
    fixture = TestBed.createComponent(AuhtLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
