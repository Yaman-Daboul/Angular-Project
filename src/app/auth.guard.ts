import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');

  // إذا التوكن موجود، اسمحله يفوت
  if (token) {
    return true;
  }

  // إذا مافي توكن، امنعه وحوله إلزاميّاً لصفحة اللوجين
  router.navigate(['/login']);
  return false;
};
