import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/sevices/product.service';
import { StockMovementService } from 'src/app/sevices/stock-movement.service';

@Component({
  selector: 'app-stock-movements-component',
  templateUrl: './stock-movements-component.component.html',
  styleUrls: ['./stock-movements-component.component.css'],
})
export class StockMovementsComponentComponent implements OnInit {
  stockMovements: any[] = [];
  products: Product[] = [];

  selectedStockMovement: any = {
    ProductId: null,
    quantity: null,
    Type: '',
    Date: '',
    ProductName: '',
  };

  oldStockQuantity: number | null = null;
  selectedProduct: Product | null = null;

  constructor(
    private stockMovementService: StockMovementService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllStockMovements();
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getallProducts().subscribe((response) => {
      this.products = response.data;
    });
  }
    reloadPageAfterDelay() {
    setTimeout(() => {
      // 2 saniye (2000ms) sonra sayfayı yenile
      window.location.reload();
    }, 3000);  // 2 saniye bekledikten sonra reload işlemi yapılacak
  }

  deleteStockMovoment(id: number): void {
    this.stockMovementService.deleteStockMovementService(id).subscribe((response) => {
      if (response.success) {
        // Silme işlemi başarılı ise, stok hareketlerini güncelle
        
        this.stockMovements = this.stockMovements.filter((item) => item.id !== id);
        this.toastrService.success('Veri silme işlemi başarılı. ' + response.message);

       this.reloadPageAfterDelay();
      } else {
        this.toastrService.error('Silme işlemi başarısız. ' + response.message);
      }
    });
  }

  getAllStockMovements(): void {
    this.stockMovementService.getall().subscribe({
      next: (response) => {
        this.stockMovements = response;
      },
      error: (err) => {
        console.error('Stok hareketleri alınırken hata oluştu:', err);
      },
    });
  }

  // Ürün seçildiğinde formu doldur
  selectProductForStockUpdate(product: Product): void {
    this.selectedProduct = product;
    this.oldStockQuantity = product.stock;

    this.selectedStockMovement = {
      ProductId: product.id,
      Quantity: product.stock,
      Type: 'giriş',
      Date: new Date().toISOString().slice(0, 10),
      ProductName: product.name,
    };
  }

  updateStockMovement(): void {
    if (!this.selectedStockMovement?.ProductId) {
      console.error('Stok hareketi eksik.');
      return;
    }

    this.stockMovementService.update(this.selectedStockMovement).subscribe({
      next: () => {
        console.log('Stok hareketi güncellendi.');
        this.getAllStockMovements();
        this.reloadPageAfterDelay();
      },
      error: (err) => {
        console.error('Güncelleme hatası:', err);
      },
    });
  }

  setMovementType(type: string): void {
    this.selectedStockMovement.Type = type;

    const amount = prompt('Kaç adet ' + (type === 'giriş' ? 'eklemek' : 'çıkarmak') + ' istiyorsunuz?');
    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      this.toastrService.error('Geçerli bir miktar giriniz.');
      return;
    }

    this.selectedStockMovement.Quantity = parsedAmount;
    console.log('Güncellenmiş hareket:', this.selectedStockMovement);
  }
}
