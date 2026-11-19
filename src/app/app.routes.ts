import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { authGuard } from './auth.guard'; // <-- استدعاء الحارس
import { Tasks } from './components/tasks/tasks';

export const routes: Routes = [
  {
    path: 'tasks',
    component: Tasks
  },
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
  },
];
