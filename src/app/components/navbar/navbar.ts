import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html'
})
export class Navbar {
  links = ['Main', 'The Projects', 'Contact Us!'];
  isLoggedIn = true;
  username = 'Yaman';

  // حقن الراوتر بالطريقة الحديثة
  private router = inject(Router);

  onLogout() {
    localStorage.removeItem('auth_token'); // حذف التوكن
    this.router.navigate(['/login']);    // إرجاع المستخدم لصفحة اللوجين
  }
}
