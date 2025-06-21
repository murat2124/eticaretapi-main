import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../Models/ListResponseModel';
import { Product } from '../Models/product';
import { ReturnStatement, ThisReceiver } from '@angular/compiler';
import { SingleResponseModel } from '../Models/SingleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://localhost:44376/Api/Products/';

  constructor(private httpClient: HttpClient) {}

  getallProducts(): Observable<ListResponseModel<Product>> {
    let newapi = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Product>>(newapi);
  }

  getByCategoryId(categoryId: number): Observable<ListResponseModel<Product>> {
    let newapi2 =
      'https://localhost:44376/Api/Products/getbyCategoryId?categoryId=' +
      categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newapi2);
  }

  productAddS(product: Product): Observable<ListResponseModel<Product>> {
    let addApi = this.apiUrl + 'add';

    return this.httpClient.post<ListResponseModel<Product>>(addApi, product);
  }

  productDeleteS(productId: Number): Observable<ListResponseModel<Product>> {
    let addApi = this.apiUrl + 'delete';

    return this.httpClient.post<ListResponseModel<Product>>(addApi, {
      id: productId,
    });
  }

  getProductById(id: number): Observable<SingleResponseModel<Product>> {
    const url = `${this.apiUrl}getbyid?id=${id}`; // URL'yi burada oluşturuyoruz
    return this.httpClient.get<SingleResponseModel<Product>>(url); // URL ile HTTP GET isteği gönderiyoruz
  }

  productUpdateService(
    product: Product
  ): Observable<ListResponseModel<Product>> {
    let updateApi = this.apiUrl + 'update';

    return this.httpClient.post<ListResponseModel<Product>>(updateApi, product);
  }

   getCategorySum(categoryId:number):Observable<SingleResponseModel<Product[]>>{

    let categoryIdSum=this.apiUrl+"categorycauntsum?categoryId="+categoryId;

    return this.httpClient.get<SingleResponseModel<Product[]>>(categoryIdSum);
  }
}
