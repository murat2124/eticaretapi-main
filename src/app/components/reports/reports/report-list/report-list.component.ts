import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StokReport } from 'src/app/Models/stokReport';
import { ReportService } from 'src/app/sevices/reports/report.service';
import { StockMovementService } from 'src/app/sevices/stock-movement.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit{

  stokRaports:StokReport[]=[]
 loading = true;
 
  constructor(private raportService:ReportService,private toastrService:ToastrService) {
  
    
  }
  ngOnInit(): void {
    this.getall();
  }

  getall(){
   this.loading = true;  // çağrı başlamadan loading true yap
this.raportService.getSummaryService().subscribe({
    next: (response) => {
      if (response.success) {


        this.stokRaports = response.data;

     
    
        this.toastrService.info("Rapor bilgileri geldi..");
      } else {
        this.toastrService.warning("Rapor bilgileri alınamadı.");
      }
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.toastrService.error("Rapor bilgileri getirilirken hata oluştu.");
      this.loading = false;
    }
  });
  }


}
