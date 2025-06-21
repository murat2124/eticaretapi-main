import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product/Crud/product-add/product-add.component';
import { ProductDeleteComponent } from './components/product/Crud/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/Crud/product-update/product-update.component';
import { StockMovementsComponentComponent } from './components/stock-moment/stock-movements-component/stock-movements-component.component';
import { SupplierComponent } from './components/supplier/supplier.component';

import { SupplierFormComponent } from './components/supplier/supplier/supplier-form/supplier-form.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddComponent } from './components/customer/customer/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './components/customer/customer/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './components/customer/customer/customer-delete/customer-delete.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderAddComponent } from './components/order/order/order-add/order-add.component';
import { AuhtRegisterComponent } from './components/auth/auht-register/auht-register.component';
import { AuhtLoginComponent } from './components/auth/auht-login/auht-login.component';
import { authGuard } from './components/guards/ahth.guard';
import { CategoryComponent } from './components/category/category.component';
import { CategoryCrudComponent } from './components/category/category-crud/category-crud.component';
import { ReportListComponent } from './components/reports/reports/report-list/report-list.component';


const routes: Routes = [
  // Ana sayfayı login sayfasına yönlendiriyoruz
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

  { path: 'auth/login', component: AuhtLoginComponent },
  { path: 'auth/register', component: AuhtRegisterComponent },

  { path: "products/category/:categoryId", component: ProductComponent },
  { path: "products", component: ProductComponent },
  { path: 'products/add', component: ProductAddComponent, canActivate: [authGuard] }, // guard ile koruma
  { path: "products/delete", component: ProductDeleteComponent ,canActivate: [authGuard]},
    { path: "products/update", component: ProductUpdateComponent ,canActivate: [authGuard]},

    { path: "category/add", component: CategoryCrudComponent },


  { path: "customers/list", component: CustomerComponent ,canActivate: [authGuard]},
  { path: "customers/add", component: CustomerAddComponent ,canActivate: [authGuard]},
  { path: "customers/update", component: CustomerUpdateComponent ,canActivate: [authGuard]},
  { path: "customers/delete", component: CustomerDeleteComponent, canActivate: [authGuard]},

  { path: "supplier", component: SupplierComponent ,canActivate: [authGuard]},
  { path: "supplier-form", component: SupplierFormComponent ,canActivate: [authGuard]},

  { path: "order", component: OrderComponent ,canActivate: [authGuard]},
  { path: "order/add", component: OrderAddComponent ,canActivate: [authGuard]},

  { path: "stock/movements", component: StockMovementsComponentComponent ,canActivate: [authGuard]},

  { path: "orderDetail", component: OrderDetailComponent ,canActivate: [authGuard]},

  
   { path: "report-list", component: ReportListComponent ,canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
