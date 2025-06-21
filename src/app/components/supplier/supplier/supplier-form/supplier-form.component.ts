import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Suppliers } from 'src/app/Models/suppliers';
import { SupplierService } from 'src/app/sevices/supplier.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css'],
})
export class SupplierFormComponent implements OnInit {
  suppliers: Suppliers[] = [];

  supplierForm: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private formBuider: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getall();

    this.createSupplier();
  }

  populateForm(supplier: any) {
    this.supplierForm.patchValue({
      id: supplier.id,
      name: supplier.name,
      phone: supplier.phone,
      fax: supplier.fax,
      email: supplier.email,
      city: supplier.city,
      country: supplier.country,
      postalCode: supplier.postalCode,
      state: supplier.state,
      street: supplier.street,
      status: supplier.status,
      supplierType: supplier.supplierType,
    });
  }

  createSupplier() {
    this.supplierForm = this.formBuider.group({
      id: [0], // Varsayılan olarak sıfır olabilir, update durumunda değişir
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fax: [''],
      street: [''],
      city: ['', Validators.required],
      state: [''],
      postalCode: [''],
      country: ['', Validators.required],
      status: ['', Validators.required],
      supplierType: ['', Validators.required],
      createAt: [new Date()],
      createdAt: [new Date()],
    });
  }
  onSubmit() {
    if (this.supplierForm.valid) {
      const supplier: Suppliers = this.supplierForm.value;

      this.toastrService.success('verileriniz geldi');
    } else {
      this.toastrService.error('form geçerili deyil gelmedi..');
    }
  }
   reloadPageAfterDelay() {
    setTimeout(() => {
      // 2 saniye (2000ms) sonra sayfayı yenile
      window.location.reload();
    }, 3000);  // 2 saniye bekledikten sonra reload işlemi yapılacak
  }

  getall() {
    this.supplierService.getallService().subscribe((response) => {
      this.suppliers = response;
    });
  }

  add() {
    var model = this.supplierForm.value;

    this.supplierService.addServicce(model).subscribe({
      next: (response) => {
        if (response) {
           
          this.toastrService.info('Kayıt başarılı');

          this.reloadPageAfterDelay();

           
       
        } else {
          this.toastrService.error('KAYIT BAŞARISIZ');
        }
      },
    });
  }

  delete() {
    var model = this.supplierForm.value;

    this.supplierService.deleteService(model).subscribe({
      next: (response) => {
        if (response) {
          this.toastrService.info('silme işlemi başarılı');

          this.reloadPageAfterDelay();
        } else {
          this.toastrService.error('silme işlemi başarılı');
        }
      },
    });
  }
  update() {
    let model = Object.assign({}, this.supplierForm.value);

    this.supplierService.updateService(model).subscribe({
      next: (response) => {
        if (response) {
          console.log('response');
          this.toastrService.info('GÜNCLEME BAŞARILI');

          this.reloadPageAfterDelay();
        } else {
          this.toastrService.error('güncellem başarısız');
        }
      },
    });
  }

  getId() {
    console.log('merhaba dünya getıd');
  }


}
