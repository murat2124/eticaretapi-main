import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sevices/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  userName: string = '';
  userRoles: string[] = [];

  constructor(public authService: AuthService,private router :Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const decoded = this.getDecodedToken();
      this.userName = decoded?.name || decoded?.email || 'Kullanıcı';
      this.userRoles = this.authService.getUserRoles();
    }
  }

  getDecodedToken(): any {
    const token = this.authService.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (err) {
      console.error('Token çözümlenemedi');
      return null;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
