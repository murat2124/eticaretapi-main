import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuhtRegisterComponent } from './auht-register.component';

describe('AuhtRegisterComponent', () => {
  let component: AuhtRegisterComponent;
  let fixture: ComponentFixture<AuhtRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuhtRegisterComponent]
    });
    fixture = TestBed.createComponent(AuhtRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
