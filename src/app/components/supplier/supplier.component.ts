import { Component, OnInit } from '@angular/core';
import { REMOVE_STYLES_ON_COMPONENT_DESTROY } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Suppliers } from 'src/app/Models/suppliers';
import { SupplierService } from 'src/app/sevices/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit{

  suppliers:Suppliers[]=[];


constructor(private supplerService:SupplierService,private toastrService:ToastrService) {

  
}


  ngOnInit(): void {
   this.getall();
  }

  getall(){

      this.supplerService.getallService().subscribe(response=>{

  this.suppliers=response
    if(response){

      this.toastrService.success("başarılı")
    }
    else{
      this.toastrService.error("hata")
    }

  });

}



}
