import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StokTakip';

  /**
   *
   */
  constructor(private rotuer:Router) {
    
    
  }

   isProductPage(): boolean {
    // Eğer URL içinde 'products' varsa, o zaman ürün sayfasındayız
    return this.rotuer.url.includes('products');
  }
}
