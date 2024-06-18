import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  let router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
