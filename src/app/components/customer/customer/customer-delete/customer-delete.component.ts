import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer';
import { CustomerService } from 'src/app/sevices/customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css'],
})
export class CustomerDeleteComponent implements OnInit {
  customers: Customer[] = [];

  customerForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,private http:HttpClient
  ) {}
  ngOnInit(): void {
    this.getall();
    this.createForm();
  }

  getall() {
    this.customerService.getallService().subscribe({
      next: (response) => {
        this.customers = response.data;

        if (response) {
          this.toastrService.info('veriler geldi');
        } else {
        }
      },
    });
  }
  createForm() {
    this.customerForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: [''],
      email: [''],
      phone: [''],
      passwordHash: [''],
      passwordSalt: [''],
      orders: [[]],
    });
    this.toastrService.info("from oluşturuldu")
  }
 
setIdAndDelete(id:number){


  this.customerForm.patchValue({id:id})
  this.deleteCustomer();
}


  deleteCustomer() {

    var Model=this.customerForm.value
    this.customerService.deleteService(Model).subscribe({
  next: (res) => {
    if (res.success) {
      this.toastrService.success('Silme başarılı:', res.message);
      this.getall(); // listeyi güncelle
    } else {
      console.warn('Silme başarısız:', res.message);
    }
  },
  error: (err) => {
    console.error('HTTP hatası:', err);
  }
});



   
  }


}


  

