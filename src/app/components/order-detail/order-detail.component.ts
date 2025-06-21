import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderDetail } from 'src/app/Models/orderDetail';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number | null = null;

  selectedQuantity: number = 1;

  selectedUnitPrice: number = 0;

  orderDetails: OrderDetail[] = [];

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getallProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        if (response) {
          this.toastrService.success;
        } else {
          this.toastrService.error('veriler gelmedi' + response.message);
        }
      },
    });
  }



  addProductToOrder() {

    if(this.selectedProductId|| this.selectedQuantity<=0){

        this.toastrService.error("lütfen geçerli ürün ve miktar girin")
      return;

    }
    const selectedProduct=this.products.find(p=>p.id===this.selectedProductId)


    const detail:OrderDetail={
      id:0,
      orderId:0,
      productId:selectedProduct.id,
      quantity:this.selectedQuantity,
      unitPrice:selectedProduct.price,
      totalPrice:this.selectedQuantity*selectedProduct.price


    }

    this.orderDetails.push(detail);
    this.toastrService.success("ürün siparişe eklendi");


    this.selectedProductId=null;
    this.selectedQuantity=1;


  }
}
