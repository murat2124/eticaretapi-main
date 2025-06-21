import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html'
})
export class ProductDeleteComponent implements OnInit{
  productDeleteForm: FormGroup;

  products:Product[]=[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastrService:ToastrService
  ) {
    this.productDeleteForm = this.fb.group({
      id: ['', Validators.required],
      barcode:['']
    });
  }
  ngOnInit(): void {
   this.getProduct();
  }


  getProduct() {
    this.productService.getallProducts().subscribe((response) => {
      this.products = response.data;

      this.toastrService.info("verileriniz geldi...")
    });
  }
    reloadPageAfterDelay() {
    setTimeout(() => {
      // 2 saniye (2000ms) sonra sayfayı yenile
      window.location.reload();
    }, 3000);  // 2 saniye bekledikten sonra reload işlemi yapılacak
  }

  // Ürünü silme işlemi
 deleteProduct() {
  const id = Number(this.productDeleteForm.value.id);
  

  

  this.productService.productDeleteS(id).subscribe({
    next: () => {
      this.toastrService.success('Ürün başarıyla silindi.');
      this.productDeleteForm.reset();

   this.reloadPageAfterDelay();
      
    },
    error: () => this.toastrService.error('Silme işlemi başarısız oldu.')
  });


  
  
}




}
