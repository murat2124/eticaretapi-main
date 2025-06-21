import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/sevices/category.service';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.css'],
})
export class CategoryCrudComponent implements OnInit {
  categorys: Category[] = [];
  categoryForm: FormGroup;
  selectedCategory: any = null;
  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getallCategory();
    this.createForm();
  }
  createForm() {
    this.categoryForm = this.formbuilder.group({
      id: [{ value: '', disabled: true }], // ID sadece görüntülenir, düzenlenemez
      name: ['', Validators.required],
      description: [''],
      product: [[]],
    });
  }
  selectCategory(category: any) {
    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
      description: category.description,
    });
  }
  getallCategory() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categorys = response.data;
        this.toastrService.info('ürün geldi');
        console.log(response);
      },
    });
  }

  addCategory() {
    let model = this.categoryForm.getRawValue();
    delete model.id;
    model.products = [];

    console.log(model);
    this.categoryService.add(model).subscribe({
      next: (response) => {
        this.toastrService.success('ürünekleme başarılı');
        console.log(response);
      },
    });
  }
  updateCategory() {
  let model = this.categoryForm.getRawValue();

  this.categoryService.Update(model).subscribe({
    next: (response) => {
    
      if (response.success) {
        this.toastrService.info("Güncelleme başarılı");
        this.getallCategory();
        this.selectCategory = null;
      } else {
      
        const errorMessage = response.message || "Güncelleme işlemi başarısız";
        this.toastrService.error(errorMessage);
        console.log(response);
      }
    },
    error: (err) => {
    
      const errmessage = err?.error?.message || "Güncelleme sırasında hata oluştu";
      this.toastrService.error(errmessage, "Güncelleme Başarısız");
      console.error(err);
    },
  });




  }
 deleteCategory() {
  let model = this.categoryForm.getRawValue();
  console.log(model);

  model.products = [];

  this.categoryService.Delete(model).subscribe({
    next: (response) => {
      console.log('Response:', response);
      if (response.success) {
        this.toastrService.success('Silme işlemi Başarılı');
      } else {
     
        const errorMessage = response.message || 'Bilinmeyen hata';
        this.toastrService.error(errorMessage, 'Silme başarısız');
      }
    },
    error: (err) => {
      console.error('Hata objesi:', err);

      const message = err?.error?.message || 'Silme sırasında hata oluştu';
      this.toastrService.error(message, 'Silme başarısız');
   },
  });
}
}
