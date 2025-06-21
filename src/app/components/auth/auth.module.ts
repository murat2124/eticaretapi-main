import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuhtLoginComponent } from './auht-login/auht-login.component';
import { AuhtRegisterComponent } from './auht-register/auht-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuhtLoginComponent,
    AuhtRegisterComponent
  ],
  imports: [
    CommonModule
  ,FormsModule,ReactiveFormsModule  ]
})
export class AuthModule { }
