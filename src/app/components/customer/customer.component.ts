import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Customer } from 'src/app/Models/customer';
import { Order } from 'src/app/Models/order';
import { CustomerService } from 'src/app/sevices/customer.service';
import { OrderService } from 'src/app/sevices/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {

customers:Customer[]=[];
orders:Order[]=[]
  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getall();
  }
  getall() {

      forkJoin({
      customers: this.customerService.getallService(),
      orders: this.orderService.getAllOrderService()
    }).subscribe({
      next: ({ customers, orders }) => {
        const customerList = customers.data;
        const orderList = orders.data;

        // Her müşteri nesnesine kendi siparişlerini bağla
        customerList.forEach(customer => {
          customer.orders = orderList.filter(order => order.customerId === customer.id);
        });

        this.customers = customerList;

        this.toastrService.success('Müşteriler ve siparişler eşleştirildi.');
      },
      error: () => {
        this.toastrService.error('Veriler alınırken hata oluştu.');
      }
    });
  }
   
}
