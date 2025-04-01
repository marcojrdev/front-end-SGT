import { NgClass, NgFor } from '@angular/common';
import { TaskService } from '../../task.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, NgClass, CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  @Output() changeComponent = new EventEmitter<string>(); // Emissor de evento

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask() {
    this.taskService.currentTask = null; // Limpa a tarefa atual
    this.changeComponent.emit('task-form'); // Emite o evento para o componente pai
  }

  edit(id: number) {
    this.taskService.getTaskById(id).subscribe(task => {
      this.taskService.currentTask = task; // Atualiza a tarefa atual no serviço
      this.changeComponent.emit(`task-form`); // Emite o evento para o componente pai
    });
  }

  deleteTask(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    }
  }

  completeTask(id: number) {
    this.taskService.completeTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGH': return 'bg-danger text-white';
      case 'MEDIUM': return 'bg-warning text-dark';
      case 'LOW': return 'bg-success text-white';
      default: return 'bg-secondary text-white';
    }
  }
}
