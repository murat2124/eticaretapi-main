import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer';
import { CustomerService } from 'src/app/sevices/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  customers: Customer[] = [];
  customerForm: FormGroup;
  selectedCustomerId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCustomerForm();
    this.getAll();
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      passwordHash: [''],
      passwordSalt: [''],
      orders: [[]],
    });
  }

  getAll() {
    this.customerService.getallService().subscribe({
      next: (response) => {
        console.log(response.data)
        this.customers = response.data;

        this.toastrService.info('Müşteri listesi yüklendi');
      },
      error: () => {
        this.toastrService.error('Veriler yüklenirken hata oluştu');
      },
    });
  }

  

  add() {
    if (this.customerForm.valid) {
      const model = {
        ...this.customerForm.value,
        orders: this.customerForm.value.orders || [],
        passwordHash: '',
        passwordSalt: '',
      };

     
        this.customerService.addService(model).subscribe({
          next: () => {
            this.toastrService.success('Müşteri başarıyla eklendi');
            this.getAll();
            this.customerForm.reset();
          },
          error: () => {
            this.toastrService.error('Ekleme işlemi sırasında hata oluştu');
          },
        });
      } 
    }
  }


  



