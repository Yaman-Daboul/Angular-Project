import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // جلب التوكن المحفوظ بالمتصفح عند تسجيل الدخول
  const token = localStorage.getItem('auth_token');

  if (token) {
    // استنساخ الطلب وإضافة هيدر التفويض (Authorization) تلقائياً
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
