import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../Models/ListResponseModel';
import { StockMomement } from '../Models/stockMovement';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {

  apiUrl="https://localhost:44376/Api/StockMoments/";
  constructor(private httpClient:HttpClient) { }

    getall():Observable<StockMomement[]>{


      let apiGetall=this.apiUrl+"getall"
        return this.httpClient.get<StockMomement[]>(apiGetall)

    }

    update(stockMomement:StockMomement):Observable<ListResponseModel<StockMomement>>{
        let apiUpdate=this.apiUrl+"update"
        return this.httpClient.post<ListResponseModel<StockMomement>>(apiUpdate,stockMomement)

    }

      changePassword(newPassword: string): Observable<any> {
    return this.httpClient.put('/api/settings/change-password', { password: newPassword });
  }
  
  delete(id:number):Observable<ListResponseModel<StockMomement>>{
         
   let apiUrldelete="https://localhost:44376/Api/StockMoments/delete"+id
      return this.httpClient.delete<ListResponseModel<StockMomement>>(apiUrldelete)
  }




 deleteStockMovementService(id: number): Observable<ListResponseModel<StockMomement>> {
  const deleteApiUrl = "https://localhost:44376/Api/StockMoments/delete"; // API url

  // POST isteği ile id'yi gönderiyoruz
  return this.httpClient.post<ListResponseModel<StockMomement>>(deleteApiUrl, { Id: id });
}

 


}
