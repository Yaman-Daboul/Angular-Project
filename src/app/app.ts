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

  // حقول نموذج إضافة تاسك جديد
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskPriority = 'medium'; // القيمة الافتراضية

  ngOnInit() {
    this.fetchTasks();
  }

  // دالة لجلب التاسكات (مفصولة لنستدعيها عند الحاجة لتحديث القائمة)
  fetchTasks() {
    this.isLoading = true;
    this.dataService.getTasks().subscribe({
      next: (data) => {
        this.tasksList = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // دالة إرسال التاسك الجديد للباك إند
  addNewTask() {
    if (!this.newTaskTitle.trim()) return; // منع الإرسال لو العنوان فارغ

    const taskPayload = {
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      priority: this.newTaskPriority
    };

    this.dataService.addTask(taskPayload).subscribe({
      next: (response) => {
        console.log('Task added successfully:', response);
        // تفريغ الحقول بعد الإنجاح
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.newTaskPriority = 'medium';

        // إعادة جلب التاسكات لتحديث القائمة فوراً
        // this.fetchTasks();

        // إعادة جلب التاسكات وتحديث الواجهة يدوياً
        // this.dataService.getTasks().subscribe({
        //   next: (data) => {
        //     this.tasksList = data;
        //     this.cdr.detectChanges(); // <-- هاد السطر هو السر ليحدث الواجهة فوراً!
        //   }
        // });

        // إضافة التاسك الجديد مباشرة لمقدمة المصفوفة وعرضه بالواجهة
        this.tasksList.unshift(response);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error adding task:', err);
      }
    });
  }

  // دالة بتشتغل أول ما يفتح المكون
  // ngOnInit() {
  //   this.dataService.getTasks().subscribe({
  //     next: (data) => {
  //       this.tasksList = data; // تخزين البيانات القادمة
  //       this.isLoading = false; // وقف التحميل
  //       this.cdr.detectChanges(); // 3. أمر مباشر للـ Angular: "يلا حدث الواجهة فوراً وصلت البيانات!"
  //       console.log('Data fetched successfully:', data);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching data:', err);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // 3. تخزين المشاريع بمتغير لنعرضه بالواجهة
  // projectsList = this.dataService.getProjects();
  // 5. خاصية محسوبة (Computed) لتصفية المستخدمين بناءً على اسمهم لحظياً
  filteredTasks = computed(() => {
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
