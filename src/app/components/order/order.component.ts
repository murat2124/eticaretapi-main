import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer';
import { Order } from 'src/app/Models/order';
import { CustomerService } from 'src/app/sevices/customer.service';
import { OrderService } from 'src/app/sevices/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  customers: Customer[] = [];
  selectedCustomerId: number | null = null;
  orderDateString: string = ''; // string olarak tutulacak
  totalAmount: number = 0;

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getall();
    this.loadCustomers();
  }

  getall() {
    this.orderService.getAllOrderService().subscribe({
      next: (response) => {
        this.orders = response.data;

        // Siparişlere müşteri bilgilerini eşleştir
        this.customerService.getallService().subscribe({
          next: (res) => {
            this.customers = res.data;

            this.orders = this.orders.map((order) => {
              const customer = this.customers.find(
                (c) => c.id === order.customerId
              );
              return { ...order, customer: customer || null };
            });

            this.toastrService.success('Siparişler ve müşteriler getirildi');
          },
          error: () => {
            this.toastrService.error('Müşteriler getirilemedi');
          },
        });

        if (!response) {
          this.toastrService.error('Sipariş getirme başarısız');
        }
      },
      error: () => {
        this.toastrService.error('Siparişler getirilemedi');
      },
    });
  }

  loadCustomers() {
    this.customerService.getallService().subscribe({
      next: (res) => {
        this.customers = res.data;
      },
      error: () => {
        this.toastrService.error('Müşteriler getirilemedi');
      },
    });
  }

  createOrder() {
    if (!this.selectedCustomerId) {
      this.toastrService.error('Lütfen müşteri seçiniz.');
      return;
    }
    if (!this.orderDateString) {
      this.toastrService.error('Lütfen sipariş tarihi seçiniz.');
      return;
    }
    if (this.totalAmount <= 0) {
      this.toastrService.error('Lütfen geçerli bir toplam tutar giriniz.');
      return;
    }

    const orderDate = new Date(this.orderDateString);

    const newOrder: Order = {
      id: 0, // ekleme sırasında id genellikle backend tarafından atanır
      customerId: this.selectedCustomerId,
      orderDate: orderDate,
      totalAmount: this.totalAmount,
      customer: undefined,
    };

    this.orderService.addS(newOrder).subscribe({
      next: () => {
        this.toastrService.success('Sipariş başarıyla eklendi');
        this.getall(); // listeyi yenile
        // formu temizle
        this.selectedCustomerId = null;
        this.orderDateString = '';
        this.totalAmount = 0;
      },
      error: () => {
        this.toastrService.error('Sipariş eklenirken hata oluştu');
      },
    });
  }
}
