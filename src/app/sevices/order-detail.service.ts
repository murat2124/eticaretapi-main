import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ListResponseModel } from '../Models/ListResponseModel';
import { OrderDetail } from '../Models/orderDetail';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient:HttpClient) { }

apiUrl="https://localhost:44376/Api/OrderDetails/";

    getallOrderDetailsS():Observable<ListResponseModel<OrderDetail>>{

        let apigetall=this.apiUrl+"getall";

      return  this.httpClient.get<ListResponseModel<OrderDetail>>(apigetall);


    }

    add(orderDetail:OrderDetail):Observable<ListResponseModel<OrderDetail>>{
         let apiAdd=this.apiUrl+"add";
         return  this.httpClient.get<ListResponseModel<OrderDetail>>(apiAdd);

    }

     delete(id:number):Observable<ListResponseModel<OrderDetail>>{
         let deleteApi=this.apiUrl+"id";
         return  this.httpClient.get<ListResponseModel<OrderDetail>>(deleteApi);

    }

    update(id:number):Observable<ListResponseModel<OrderDetail>>{
         let updateApi=this.apiUrl+"update";
         return  this.httpClient.get<ListResponseModel<OrderDetail>>(updateApi);

    }


}
