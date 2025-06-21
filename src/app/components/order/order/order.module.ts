import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';



@NgModule({
  declarations: [OrderComponent, OrderAddComponent, OrderUpdateComponent, OrderCancelComponent,OrderDetailComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],exports:[OrderComponent]
})
export class OrderModule { }
