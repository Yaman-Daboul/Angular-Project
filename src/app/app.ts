import { Component, signal, inject, OnInit, ChangeDetectorRef, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { DataService } from "./services/data"
import { CommonModule } from '@angular/common'; // مهم جداً عشان الـ async pipe لو احتجناه
import { FormsModule } from '@angular/forms'; // 2. مهم جداً لربط الـ input بـ ngModel

@Component({
  imports: [RouterOutlet, Navbar, CommonModule, FormsModule],
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
  tasksList: any[] = [];
  // 1. حولناها لـ signal بدل مصفوفة عادية
  // tasksList = signal<any[]>([]);

  isLoading = true; // مؤشر تحميل

  // 4. متغير تفاعلي لنص البحث (Search Query)
  searchQuery = signal('');



  // دالة بتشتغل أول ما يفتح المكون
  ngOnInit() {
    this.dataService.getUsers().subscribe({
      next: (data) => {
        this.tasksList = data; // تخزين البيانات القادمة
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
  // 5. خاصية محسوبة (Computed) لتصفية المستخدمين بناءً على اسمهم لحظياً
  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.tasksList;

    return this.tasksList.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query)
    );
  });

  increment() {
    this.count.update(val => val + 1);
  }
}
