import { Component, signal, inject, OnInit, ChangeDetectorRef, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from "../../services/data" // مسار صحيح حسب مكان مجلد الخدمات عندك
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  imports: [RouterOutlet, Navbar, CommonModule, FormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  protected readonly title = signal('Angular-app');
  pagetitle = 'Angular';
  developerName = 'Yaman';

  private dataService = inject(DataService);
  private cdr = inject(ChangeDetectorRef);

  tasksList: any[] = [];
  isLoading = true;
  searchQuery = signal('');

  newTaskTitle = '';
  newTaskDescription = '';
  newTaskPriority = 'medium';

  ngOnInit() {
    this.fetchTasks();
  }

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

  addNewTask() {
    if (!this.newTaskTitle.trim()) return;

    const taskPayload = {
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      priority: this.newTaskPriority
    };

    this.dataService.addTask(taskPayload).subscribe({
      next: (response) => {
        console.log('Task added successfully:', response);
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.newTaskPriority = 'medium';

        this.tasksList.unshift(response);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error adding task:', err);
      }
    });
  }

  filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.tasksList;

    return this.tasksList.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query)
    );
  });

}
