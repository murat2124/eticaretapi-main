import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer';
import { Order } from 'src/app/Models/order';
import { Product } from 'src/app/Models/product';
import { CustomerService } from 'src/app/sevices/customer.service';
import { OrderService } from 'src/app/sevices/order.service';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit {
  products: Product[] = [];
  orders: Order[] = [];
  customers: Customer[] = [];
  ordersForm: FormGroup;
  selectedProduct?: Product;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getallCustomer();
    this.getallProduct();
  }

  createForm() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.ordersForm = this.formBuilder.group({
      orderDate: [today, Validators.required],
      customerId: ['', Validators.required],
      productId: ['', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
      CustomerName: ['', Validators.required],
      CustomerEmail: ['', Validators.required],
      CustomerPhone: ['']
    });
  }

  addOrder() {
    if (this.ordersForm.invalid) {
      this.toastrService.error("Form hatalı");
      return;
    }

    const model = { ...this.ordersForm.value };
    console.log('Gönderilen model:', model);

    this.orderService.addS(model).subscribe({
      next: () => {
        this.toastrService.success("Ekleme başarılı");
      },
      error: (err) => {
        this.toastrService.error("Ekleme başarısız");
        console.error("API Hatası:", err);
      }
    });
  }

  onCustomerChange(): void {
    const selectedCustomerId = this.ordersForm.get('customerId')?.value;
    const selectedCustomer = this.customers.find(c => c.id == selectedCustomerId);

    if (selectedCustomer) {
      this.ordersForm.patchValue({
        CustomerName: selectedCustomer.name,
        CustomerEmail: selectedCustomer.email,
        CustomerPhone: selectedCustomer.phone
      });
    }
  }

  onProductChange(): void {
    const selectedProductId = this.ordersForm.get('productId')?.value;
    this.selectedProduct = this.products.find(p => p.id == selectedProductId);
    
  }

  getallProduct() {
    this.productService.getallProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log("Ürünler:", this.products);
      },
      error: (err) => {
        console.error("Ürünler alınamadı:", err);
      }
    });
  }

  getallCustomer() {
    this.customerService.getallService().subscribe({
      next: (response) => {
        this.customers = response.data;
      },
      error: (err) => {
        console.error("Müşteriler alınamadı:", err);
      }
    });
  }
}
