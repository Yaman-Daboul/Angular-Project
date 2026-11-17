import { Component, signal, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { DataService } from "./services/data"
import { CommonModule } from '@angular/common'; // مهم جداً عشان الـ async pipe لو احتجناه

@Component({
  imports: [RouterOutlet, Navbar, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit {
  protected readonly title = signal('Angular-app');
  pagetitle = 'Angular';
  developerName = 'Yaman';
  count = signal(0);

  // 2. حقن الخدمة (Dependency Injection) بطريقة حديثة وسريعة
  private dataService = inject(DataService);
  private cdr = inject(ChangeDetectorRef); // 2. حقن أداة تحديث الواجهة يدوياً عند الحاجة

  // مصفوفة لنخزن فيها المستخدمين القادمين من الـ API
  usersList: any[] = [];
  isLoading = true; // مؤشر تحميل

  // دالة بتشتغل أول ما يفتح المكون
  ngOnInit() {
    this.dataService.getUsers().subscribe({
      next: (data) => {
        this.usersList = data; // تخزين البيانات القادمة
        this.isLoading = false; // وقف التحميل
        this.cdr.detectChanges(); // 3. أمر مباشر للـ Angular: "يلا حدث الواجهة فوراً وصلت البيانات!"
        console.log('Data fetched successfully:', data);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
      }
    });
  }
  // 3. تخزين المشاريع بمتغير لنعرضه بالواجهة
  // projectsList = this.dataService.getProjects();

  increment() {
    this.count.update(val => val + 1);
  }
}
