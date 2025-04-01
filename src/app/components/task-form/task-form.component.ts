import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, HttpClientModule, NgIf],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number | null;

  @Output() changeComponent = new EventEmitter<string>(); // Emissor de evento

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      responsible: ['', Validators.required],
      priority: ['MEDIUM', Validators.required],
      deadline: ['', Validators.required],
      status: ['IN_PROGRESS']
    });

    //this.taskId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    //
    this.taskId = this.taskService.currentTask?.id ? this.taskService.currentTask.id : null;

    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.taskForm.patchValue(task);
      });
    }
  }

  cancelar(): void {
    this.changeComponent.emit('task-list');
  }

  saveTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (this.taskId) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(() => {
        this.changeComponent.emit('task-list');
      });
    } else {
      this.taskService.createTask(this.taskForm.value).subscribe(() => {
        this.changeComponent.emit('task-list');
      });
    }
  }
}
