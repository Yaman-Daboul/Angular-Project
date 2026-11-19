import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // استيراد RouterLink لربط العناصر بالمسارات بدل إعادة تحميل الصفحة

interface NavItem {
  label: string; // النص الظاهر في شريط التنقل
  path: string;  // المسار (Route) الذي سينتقل إليه المستخدم
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink], // تفعيل RouterLink داخل القالب
  styleUrl: './navbar.css',
  templateUrl: './navbar.html'
})
export class Navbar {
  // قائمة روابط التنقل مع مساراتها
  navLinks: NavItem[] = [
    { label: 'Main', path: '/' },
    { label: 'Tasks', path: '/tasks' }, // رابط صفحة المهام المرتبطة بـ MongoDB عبر Express
    { label: 'The Projects', path: '/projects' },
    { label: 'Contact Us!', path: '/contact' }
  ];

  isLoggedIn = true;
  username = 'Yaman';

  // حقن الراوتر بالطريقة الحديثة
  private router = inject(Router);

  onLogout() {
    localStorage.removeItem('auth_token'); // حذف التوكن
    this.router.navigate(['/login']);    // إرجاع المستخدم لصفحة اللوجين
  }
}
