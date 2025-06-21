import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ListResponseModel } from '../Models/ListResponseModel';
import { Order } from '../Models/order';
import { Customer } from '../Models/customer';
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

 
  apiUrl="https://localhost:44376/Api/Orders/";

  constructor(private httpClient:HttpClient) { }


  getAllOrderService():Observable<ListResponseModel<Order>>{

    let getallApi=this.apiUrl+"getall"

   return this.httpClient.get<ListResponseModel<Order>>(getallApi);

  }

  addS(order:Order):Observable<ListResponseModel<Order>>{
      
    let apiAdd=this.apiUrl+"add"

    return this.httpClient.post<ListResponseModel<Order>>(apiAdd,order)

  }

  updateS(order:Order):Observable<ListResponseModel<Order>>{
      
    let apiUpdate=this.apiUrl+"update"

    return this.httpClient.post<ListResponseModel<Order>>(apiUpdate,order)

  }
  deleteS(order :Order):Observable<ListResponseModel<Order>>{
     let apiDelete=this.apiUrl+"delete"

    return this.httpClient.post<ListResponseModel<Order>>(apiDelete,order)
  }
  
  



    

  
}
