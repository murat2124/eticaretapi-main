import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/Models/ListResponseModel';
import { StokReport } from 'src/app/Models/stokReport';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  apiUrl="https://localhost:44376/api/Report/stocksummary"

  constructor(private httpClient:HttpClient) {


   }
   getSummaryService():Observable<ListResponseModel<StokReport>>{

    return this.httpClient.get<ListResponseModel<StokReport>>(this.apiUrl);

   }

  
}
