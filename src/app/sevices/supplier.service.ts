import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../Models/ListResponseModel';
import { Suppliers } from '../Models/suppliers';
import { ReturnStatement, ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private httpClient: HttpClient) {}
  apiurl = 'https://localhost:44376/Api/Suppliers/';

  getallService(): Observable<Suppliers[]> {
    let apiGetall = this.apiurl + 'getall';
    return this.httpClient.get<Suppliers[]>(apiGetall);
  }
  getByIdService(id: number): Observable<Suppliers[]> {
    
    const apiUrlGetById='${this.apiUrl}/${id}';

    return this.httpClient.get<Suppliers[]>(apiUrlGetById);
  }
  addServicce(supplier: Suppliers):Observable<Suppliers[]>{

   return this.httpClient.post<Suppliers[]>(this.apiurl+"add",supplier)

  }
  updateService(supplier: Suppliers):Observable<Suppliers[]>{


    return this.httpClient.post<Suppliers[]>('https://localhost:44376/Api/Suppliers/update',supplier)
  }

  deleteService(id: number):Observable<Suppliers[]>{

   
   

     return this.httpClient.post<Suppliers[]>('https://localhost:44376/Api/Suppliers/delete',id)

  }

}
