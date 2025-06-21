import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { AuthService } from 'src/app/sevices/auth.service';

@Component({
  selector: 'app-auht-register',
  templateUrl: './auht-register.component.html',
  styleUrls: ['./auht-register.component.css']
})
export class AuhtRegisterComponent implements OnInit{

  registerForm:FormGroup
  /**
   *
   */
  constructor(private authService:AuthService,private toastrService:ToastrService,private formBuilder:FormBuilder) {
  
    
  }
  ngOnInit(): void {
   this.createForm();
  }
  createForm(){
    this.registerForm=this.formBuilder.group({

        firstName: ['',Validators.required],
            lastName:  ['',Validators.required],
    email:  ['',Validators.required],
    password:  ['',Validators.required]




    })


  }

  register(){

    let model = this.registerForm.value;
  this.authService.register(model).subscribe({
    next: response => {
      console.log(response)
      if(response.success){
        this.toastrService.success(response.message);
        console.log(this.register)
      } else {
        this.toastrService.error(response.message);


      }
    }
  });

    

  }



}
