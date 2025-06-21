import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './Models/product';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: Product[], categoryId: number): Product[] {
    if (categoryId === 0) {
      return products; // Kategori 0 ise, tüm ürünleri döndür
    }
    
    // Belirtilen kategoriye göre filtreleme işlemi
    return products.filter(product => product.categoryId === categoryId);
  }
}