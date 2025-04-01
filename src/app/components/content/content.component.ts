import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { WelcomeContentComponent } from "../welcome-content/welcome-content.component";
import { LoginFormComponent } from "../login-form/login-form.component";
import { AxiosService } from '../../axios.service';
import { first, last } from 'rxjs';
import { ButtonsComponent } from "../buttons/buttons.component";
import { AuthContentComponent } from "../auth-content/auth-content.component";
import { NgIf } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from "../task-list/task-list.component";


@Component({
  selector: 'app-content',
  imports: [CommonModule, NgFor, NgIf, HttpClientModule, LoginFormComponent, ButtonsComponent, WelcomeContentComponent, AuthContentComponent, TaskFormComponent, TaskListComponent],
  templateUrl: './content.component.html',
  standalone: true,
  styleUrl: './content.component.css'
})
export class ContentComponent {

  componentToShow: string = "welcome";

  constructor(private axiosService: AxiosService) {}

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onChangeComponent(component: string): void {
    console.log('Evento recebido:', component);
    this.componentToShow = component; // Atualiza o componente a ser exibido
  }

  onLogin(input: any): void {
    this.axiosService.request(
      "POST",
      "/login",
      {
        login: input.login,
        password: input.password
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.componentToShow = "task-list";
      console.log('ComponentToShow:', this.componentToShow);
    });
  }

  onRegister(input: any): void {
    this.axiosService.request(
      "POST",
      "/register",
      {
        nome: input.firstName,
        sobreNome: input.lastName,
        login: input.login,
        password: input.password
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.componentToShow = "task-list";
    });
  }

}
