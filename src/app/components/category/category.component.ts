import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/sevices/category.service';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categorys: Category[] = [];
  currentCategory: Category;
  firstThreeProducts: Product[] = [];

  // Her kategori için ürün sayısını tutar: { kategoriId: ürünAdedi }
  categoryCounts: { [key: number]: number } = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categorys = response.data;

      if (this.categorys.length > 0) {
        this.setCurrentCategory(this.categorys[0]);
      }
    });
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;

    this.productService.getCategorySum(category.id).subscribe((response) => {
      const result = response.data; // Product[]

      // Ürün sayısını kategoriye kaydet
      this.categoryCounts[category.id] = result.length;

      // İlk 3 ürünü al ve sakla
      this.firstThreeProducts = result.slice(0, 3);

      // Konsola da yazdırabilirsin (isteğe bağlı)
      console.log(
        `Kategori: ${category.name}, Toplam ürün sayısı: ${this.categoryCounts[category.id]}`
      );
      this.firstThreeProducts.forEach((product, index) => {
        console.log(`Ürün ${index + 1}:`, product.name);
      });
    });
  }
}
