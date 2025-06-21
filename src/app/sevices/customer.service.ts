import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../Models/ListResponseModel';
import { Customer } from '../Models/customer';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44376/Api/Customers/';
  constructor(private httpClent: HttpClient) {}

  getallService(): Observable<ListResponseModel<Customer>> {
    let getallUrl = this.apiUrl + 'getall';
    return this.httpClent.get<ListResponseModel<Customer>>(getallUrl);
  }

  addService(customer:Customer):Observable<ListResponseModel<Customer>>{

    let addApi=this.apiUrl+"add"

      return this.httpClent.post<ListResponseModel<Customer>>(addApi,customer)
  }
  deleteService(customer:Customer):Observable<ListResponseModel<Customer>>{
    let deleteId = "https://localhost:44376/Api/Customers/delete"

      return this.httpClent.post<ListResponseModel<Customer>>(deleteId,customer)
      

  }



  updateService(customer:Customer):Observable<ListResponseModel<Customer>>{

let updateCustomer=this.apiUrl+"update"

      return this.httpClent.post<ListResponseModel<Customer>>(updateCustomer,customer)

  }

  
}
