import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[] | null | undefined, categoryId: number): Product[] {
    if (!products) return [];

    const id = Number(categoryId); // tipi garanti altına al
    if (id === 0) return products;

    return products.filter((product) => product.categoryId === id);
  }
}
