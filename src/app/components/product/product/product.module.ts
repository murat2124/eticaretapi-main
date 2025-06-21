import { NgModule } from '@angular/core';

import { ProductComponent } from '../product.component';
import { ProductAddComponent } from '../Crud/product-add/product-add.component';
import { ProductDeleteComponent } from '../Crud/product-delete/product-delete.component';




import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Toast, ToastrModule } from 'ngx-toastr';
import { FilterPipe } from 'src/app/pipes/filter-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryFilterPipe } from 'src/app/category-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { ProductUpdateComponent } from '../Crud/product-update/product-update.component';






@NgModule({
  declarations: [
ProductComponent,
ProductAddComponent,
ProductDeleteComponent,
ProductUpdateComponent,

FilterPipe,CategoryFilterPipe

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule,
 
    FormsModule,HttpClientModule,BrowserAnimationsModule,AppRoutingModule
  ],
  exports:[ProductAddComponent,ProductUpdateComponent,ProductDeleteComponent]
})
export class ProductModule { }
