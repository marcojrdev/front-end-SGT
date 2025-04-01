import { CommonModule, NgFor } from '@angular/common';
import { AxiosService } from './../../axios.service';
import { Component, OnInit  } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-auth-content',
  standalone: true,
  imports: [CommonModule, NgFor, TaskFormComponent],
  templateUrl: './auth-content.component.html',
  styleUrl: './auth-content.component.css'
})
export class AuthContentComponent {
  data: string[] = []

  constructor(private axiosService: AxiosService) {}

  ngOnInit(): void {
    const token = this.axiosService.getAuthToken(); // Supondo que o método getAuthToken() retorna o token armazenado

    this.axiosService
      .request("GET", "http://localhost:8080/messages", {})
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }
}
