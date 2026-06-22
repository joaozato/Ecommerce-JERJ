import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SubmitButtonComponent } from '../../shared/SubmitButton/submit-button.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    CommonModule,             // <-- necessário para utilizar *ngIf e *ngFor
    FormsModule,              // <-- necessário para utilizar [(ngModel)]
    SubmitButtonComponent,     // <-- botão de submit importado da pasta shared
    RouterLink,
  ]
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  cpf: string = '';

  loading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.loading = true; // Inicia loading

    this.authService.register({ name: this.name, email: this.email, password: this.password, cpf:this.cpf }) // Chama a função register que está declarada no auth
      .subscribe({
        next: () => {
          this.loading = false; // Encerra o loading
          this.router.navigate(['/login']); // Redireciona para página de login após registrar
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Ocorreu um erro. Verifique os dados e tente novamente.';
          console.error('Erro no registro:', err);
        }
      });
  }
}
