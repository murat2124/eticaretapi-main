import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './components/product/product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StockMovementModule } from './components/stock-moment/stock-movement/stock-movement.module';
import { SupplierModule } from './components/supplier/supplier/supplier.module';





import { CategoryComponent } from './components/category/category.component';




import { UserComponent } from './components/user/user.component';
import { NavComponent } from './components/nav/nav.component';
import { OrderModule } from './components/order/order/order.module';
import { CustomerModule } from './components/customer/customer/customer.module';
import { AuthModule } from './components/auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryCrudComponent } from './components/category/category-crud/category-crud.component';
import { ReportsModule } from './components/reports/reports.module';














@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    

   

 
    UserComponent,
    NavComponent,
    CategoryCrudComponent,



 
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,CustomerModule,ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
    
      
      // Diğer rotalar...
    ]),

    ProductModule,
     StockMovementModule,
     SupplierModule,OrderModule,AuthModule ,ReportsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
