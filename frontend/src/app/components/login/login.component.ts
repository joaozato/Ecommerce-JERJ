import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {  SubmitButtonComponent } from '../../shared/SubmitButton/submit-button.component';
import {  CommonModule  } from '@angular/common';
import {  FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,             // <-- Necessário para utilizar *ngIf e *ngFor no html
    FormsModule,              // <-- Necessário para utilizar [(ngModel)] no html
    SubmitButtonComponent,     // <-- Necessário para utilizar o component de botão shared no html
    RouterLink,
  ]
})
export class LoginComponent {

  email: string = '';
  senha: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login({ email: this.email, senha: this.senha })
      .subscribe({
        next: () => {
          this.loading = false;
          console.log(this.authService.getPayload());
          console.log(this.authService.isTokenExpired());
          console.log(this.authService.isAdmin())
          this.router.navigate(['/home']); // Se o login for bem sucedido, vai direcionar para a página principal
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Email ou senha inválidos!';
          console.error('Erro ao fazer login:', err);
        }
      });
  }
}
