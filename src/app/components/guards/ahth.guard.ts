import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/sevices/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Kullanıcı giriş yapmışsa izin ver
  }

  alert("Bu sayfaya erişmek için giriş yapmalısınız!");
  router.navigate(['/auth/login']);
  return false;
};
