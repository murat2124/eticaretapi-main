import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/sevices/auth.service';

@Component({
  selector: 'app-auht-login',
  templateUrl: './auht-login.component.html',
  styleUrls: ['./auht-login.component.css'],
})
export class AuhtLoginComponent implements OnInit {
  loginForm!: FormGroup;
 isLoading=false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
  
  ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
login() {
  if (this.loginForm.invalid) return;

  this.isLoading = true;

  const MIN_SPINNER_TIME = 500; // 0.5 saniye
  const startTime = Date.now();

  this.authService.login(this.loginForm.value).subscribe({
    next: (response) => {
      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, MIN_SPINNER_TIME - elapsed);

      setTimeout(() => {
        this.isLoading = false;

        if (response.success && response.data?.token) {
          this.authService.setToken(response.data.token);
          this.toastrService.success("Giriş başarılı");
          this.router.navigate(['/products']);
        } else {
          this.toastrService.error(response.message || "Giriş başarısız.");
        }
      }, waitTime);
    },
    error: () => {
      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, MIN_SPINNER_TIME - elapsed);

      setTimeout(() => {
        this.isLoading = false;
        this.toastrService.error("Giriş sırasında hata oluştu.");
      }, waitTime);
    }
  });
}


}
