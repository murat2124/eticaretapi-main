import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer';
import { CustomerService } from 'src/app/sevices/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
})
export class CustomerUpdateComponent implements OnInit {
  customers: Customer[] = [];

  customerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getall();
  }

  createForm() {
    this.customerForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      passwordHash: '',
      passwordSalt: '',
      orders: [[]],
    });
  }

 onSubmit() {
  if (this.customerForm.valid) {
    let model = this.customerForm.value;

    // Eğer orders formda string ise, virgüllerden dizi yap
    if (typeof model.orders === 'string') {
      model.orders = model.orders
        .split(',')
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0);
    }

    console.log('Gönderilen model:', model);

    this.customerService.updateService(model).subscribe({
      next: (response) => {
        this.customers = response.data;
        if (response) {
          this.toastrService.success('Güncelleme yapıldı');
        } else {
          this.toastrService.error(response.message);
        }
      },
      error: (err) => {
        this.toastrService.error('Güncelleme sırasında hata oluştu');
        console.error(err);
      },
    });
  } else {
    this.toastrService.error('Lütfen gerekli alanları doldurunuz');
  }
}


  getall() {
    this.customerService.getallService().subscribe({
      next: (response) => {
        this.customers = response.data;
        if (response) {
          this.toastrService.info('veriler geldi');
        } else {
          this.toastrService.info('VERİLER YOK');
        }
      },
    });
  }

 selectCustomer(customer: any) {
  this.customerForm.patchValue({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    passwordHash: customer.passwordHash || '',
    passwordSalt: customer.passwordSalt || '',
    orders: customer.orders ? customer.orders.join(', ') : '',  // array'i stringe çevir
  });
}
onUpdateButtonClick(customer: any) {
  this.customerForm.patchValue({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    passwordHash: customer.passwordHash,
    passwordSalt: customer.passwordSalt,
    orders: customer.orders || [],
  });
}







}
