import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { authGuard } from './auth.guard'; // <-- استدعاء الحارس

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard] // <-- هون الحماية اشتغلت!
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
