import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { ListResponseModel } from '../Models/ListResponseModel';
import { Category } from '../Models/category';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:44376/Api/Categorys/'; 

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ListResponseModel<Category>> {

    let categorygetall=this.apiUrl+"getall";
    return this.http.get<ListResponseModel<Category>>(categorygetall);
  }
  add(category:Category):Observable<ListResponseModel<Category>>{

    let add=this.apiUrl+"add"

    return this.http.post<ListResponseModel<Category>>(add,category)
  }
   Update(category:Category):Observable<ListResponseModel<Category>>{

    let add=this.apiUrl+"update"

    return this.http.post<ListResponseModel<Category>>(add,category)
  }
   Delete(category:Category):Observable<ListResponseModel<Category>>{

    let add=this.apiUrl+"delete"

    return this.http.post<ListResponseModel<Category>>(add,category)
  }
 

}
