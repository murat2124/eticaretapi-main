import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// doğru yol

import { FormsModule } from '@angular/forms';
import { StockMovementsComponentComponent } from '../stock-movements-component/stock-movements-component.component';

@NgModule({
  declarations: [StockMovementsComponentComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [StockMovementsComponentComponent]
})
export class StockMovementModule { }
