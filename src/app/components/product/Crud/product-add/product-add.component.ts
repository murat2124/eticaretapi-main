import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/sevices/category.service';
import { Category } from 'src/app/Models/category';
import { ProductService } from 'src/app/sevices/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/sevices/auth.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  categories: Category[] = [];
  isGuest=false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService:ProductService,
    private tostrService:ToastrService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getCategories(); // Kategorileri al
 this.isGuest=   this.authService.isGuest();
  }

  // Formu oluşturma
  createForm() {
    const today=formatDate(new Date(),"yyyy-MM-DD","en");
    this.productAddForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      createdDate: [today, Validators.required],
      categoryId: ['', Validators.required],
         barcode: [''],

    });
  }

 
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data; 
      },
      error: (err) => {
        console.error('Kategoriler alınamadı', err);
      },
    });
  }

 
  onSubmit() {
   
    if (this.productAddForm.valid) {
      const productModel = this.productAddForm.value;
      console.log('Form verisi  ');
   
    } else {
      console.warn('Form geçerli değil.');
    }
  }

  reloadPageAfterDelay() {
    setTimeout(() => {
    
      window.location.reload();
    }, 3000);  
  }
productAdd() {
      if (this.isGuest) {
     this.tostrService.error("ekleme yekiniz yok ")
      return;
    }
 if(!this.authService.hasRole('add')){

 
  console.log("kullanıcı rolleri ",this.authService.getUserRoles?.());

      this.tostrService.error("ürün ekleme yetkiniz yok")
      return;
      
    }

  let productModel = Object.assign({}, this.productAddForm.value);
  console.log("Gönderilen Ürün Verisi:", productModel);

  this.productService.productAddS(productModel).subscribe(
    (response) => {
     
      this.tostrService.success("ürün ekleme başarılı")
this.reloadPageAfterDelay();
      
    },
    (err: HttpErrorResponse) => {
      console.error('Hata oluştu:', err);
    }
  );
}

}
