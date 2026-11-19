import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading tasks:', err),
    });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    this.taskService.createTask(title).subscribe({
      next: (created) => {
        this.tasks = [created, ...this.tasks];
        this.newTaskTitle = '';
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error creating task:', err),
    });
  }
}
