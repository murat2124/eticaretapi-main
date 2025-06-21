import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  productUpForm: FormGroup;
products:Product[]=[]


  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private productSerive:ProductService,private toastrService:ToastrService
    
  ) {}
  ngOnInit(): void {
    this.createProductUpForm();
    this.getProducts();
  }

  createProductUpForm() {
    const today = formatDate(new Date(), 'yyyy-MM-DD', 'en');
    this.productUpForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      createdDate: [today, Validators.required],
      categoryId: ['', Validators.required],
      barcode:[""]

    });
  }
  onSubmit() {
  if (this.productUpForm.valid) {
    console.log("Form Data:", this.productUpForm.value);
    // Buraya veri gönderme işlemi eklersin
  } else {
    this.productUpForm.markAllAsTouched(); // Hatalı alanları göster
    console.warn("Form is invalid!");
  }
 
}

 getProducts(){

      this.productSerive.getallProducts().subscribe(respnse=>{


        this.products=respnse.data;
        this.toastrService.info("kayıtlar geldi")


      })

    
  }
    reloadPageAfterDelay() {
    setTimeout(() => {
      // 2 saniye (2000ms) sonra sayfayı yenile
      window.location.reload();
    }, 3000);  // 2 saniye bekledikten sonra reload işlemi yapılacak
    }

  updateProduct(){

   let formModel=Object.assign({},this.productUpForm.value)

      this.productSerive.productUpdateService(formModel).subscribe(respnse=>{

            if(respnse.success){

                this.toastrService.success("güncelleme  başarılı")
                this.reloadPageAfterDelay(); 
            }
            else{
           
              this.toastrService.error(respnse.message)
            }

      })

  }
 fillForm(product: Product) {
  this.productUpForm.patchValue({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    createdDate: formatDate(product.createdDate, 'yyyy-MM-dd', 'en'),
    categoryId: product.categoryId,
    barcode:product.barcode
  });
}


}
