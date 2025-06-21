import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from '../supplier.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SupplierComponent,
    SupplierFormComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  exports:[
    SupplierComponent
  ]
})
export class SupplierModule { }
