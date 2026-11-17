import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1. استيراد HttpClient

@Injectable({
  providedIn: 'root' // هذا معناه أن الخدمة متاح استخدامها في كل المشروع
})
export class DataService {

  private http = inject(HttpClient); // 2. حقن الـ HttpClient

  // رابط API وهمي جاهز للتجارب
  // private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  private apiUrl = 'http://127.0.0.1:8000/api/test';

  // بيانات وهمية تشبه ما ستجلبه من MongoDB مستقبلاً
  // private projects = [
  //   { id: 1, name: 'E-Commerce API', tech: 'Laravel & MySQL', status: 'Completed' },
  //   { id: 2, name: 'Task Management App', tech: 'Angular & Node.js', status: 'In Progress' },
  //   { id: 3, name: 'Realtime Chat', tech: 'WebSockets & MongoDB', status: 'Pending' }
  // ];
  // دالة لجلب هذه البيانات
  // getProjects() {
  //   return this.projects;
  // }
  // دالة بترجع Observable بالبيانات القادمة من السيرفر
  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }
}

