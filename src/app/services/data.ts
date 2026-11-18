import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1. استيراد HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // هذا معناه أن الخدمة متاح استخدامها في كل المشروع
})
export class DataService {

  private http = inject(HttpClient); // 2. حقن الـ HttpClient

  // private apiUrl = 'http://127.0.0.1:8000/api/test';
  private apiUrl = 'http://127.0.0.1:8000/api'; // الرابط الأساسي للـ API

  // getTasks() {
  //   return this.http.get<any[]>(this.apiUrl);
  // جلب التاسكات (GET)
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/test`);
  }
  // إضافة تاسك جديد (POST)
  addTask(taskData: { title: string; description: string; priority: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/test2`, taskData);
  }

  // رابط API وهمي جاهز للتجارب
  // private apiUrl = 'https://jsonplaceholder.typicode.com/users';

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


}

