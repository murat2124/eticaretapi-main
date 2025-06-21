import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/Models/product';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], filterText: string): Product[] {
    if (!filterText) {
      return products;
    }
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(filterText.toLowerCase()) ||
        product.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
