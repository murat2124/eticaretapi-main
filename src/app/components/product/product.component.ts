import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/sevices/product.service';
import { CategoryService } from 'src/app/sevices/category.service'; // CategoryService importu
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filterText: string = "";
  filterCategoryId: number = 0;
  categories: any[] = []; // Kategoriler için bir değişken




  constructor(
    private productService: ProductService,
    private activatedRouted: ActivatedRoute,
    private categoryService: CategoryService,
    private toastrService:ToastrService 
  ) {}

  ngOnInit(): void {
   
    this.getCategories(); // Kategorileri al
   
    this.activatedRouted.params.subscribe((response) => {
      if (response["id"]) {
        this.getByCategoryId(response["id"]);
      } else {
        this.getProduct();
      }
    });
   
    
  }

  getProduct() {
    this.productService.getallProducts().subscribe((response) => {
      this.products = response.data;
     
    

      this.toastrService.success('İşlem başarılı!', 'Başlık', {
  positionClass: 'toast-top-left'  // veya 'toast-bottom-left', 'toast-top-center' vb.
});
    });
  }

  getByCategoryId(categoryId: number) {
    this.productService.getByCategoryId(categoryId).subscribe((response) => {
      this.products = response.data;

      window.location.reload();
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data; // Kategorileri al
    });
  }
  getCategoryName(categoryId:number){
    const category=this.categories.find(c=>c.id==categoryId)

      return category?category.name:'bilinmiyor'
  }
   onCategoryClick(categoryId: number) {
    if (this.filterCategoryId === categoryId) {
      this.filterCategoryId = 0; // Aynı kategoriye tıklanırsa, filtreyi sıfırla
    } else {
      this.filterCategoryId = categoryId; // Seçilen kategoriyi filtrele
    }
  }
 
  
}
