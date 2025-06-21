import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementsComponentComponent } from './stock-movements-component.component';

describe('StockMovementsComponentComponent', () => {
  let component: StockMovementsComponentComponent;
  let fixture: ComponentFixture<StockMovementsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockMovementsComponentComponent]
    });
    fixture = TestBed.createComponent(StockMovementsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
