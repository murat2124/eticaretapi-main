import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from '../customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CustomerComponent, CustomerAddComponent, CustomerDeleteComponent, CustomerUpdateComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  exports:[CustomerComponent,CustomerAddComponent]
})
export class CustomerModule { }
