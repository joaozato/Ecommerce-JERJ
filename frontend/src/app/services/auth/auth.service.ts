import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

// Import das Interfaces
import { LoginRequest } from '../../models/auth/login-request.model';
import { RegisterRequest } from '../../models/auth/register-request.model';
import { AuthResponse } from '../../models/auth/auth-response.model';
import { JwtPayload } from '../../models/auth/jwt-payload.model';

// Esse import da biblioteca jwt-decode
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:8080'; // URL DO BACK - Provavelmente vai mudar quando for para a Vercel

  constructor(private http: HttpClient, private router: Router) { }

  // LOGIN
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token); // salva o token do JWT
        })
      );
  }

  // CADASTRO
  register(data: RegisterRequest): Observable<any> {
    const payload = {
      nome: data.name,
      email: data.email,
      senha: data.password,
      cpf: data.cpf,
      role: 'USER' // Define a role padrão para novos cadastros
    };
    return this.http.post(`${this.apiUrl}/usuarios/Cadastro`, payload, { responseType: 'text' });
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Router vai redirecionar para o componente de login
  }

  // VERIFICA SE ESTÁ LOGADO
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // se existir token - true
  }

  // RETORNA TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Utiliza da biblioteca jwt-decode para decodificar o payload do token JWT
  getPayload(): JwtPayload | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.getPayload();

    // Se não existe payload ou exp, consideramos expirado
    if (!payload?.exp) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);

    return payload.exp < now;
  }

  /* hasRole(role: string): boolean {

    const payload = this.getPayload();

    if (!payload?.role) {
      return false;
    }

    return payload.role === role;
  } Pode ser utilizado no futuro */

  isAdmin(): boolean {
    const role = this.getPayload()?.role;
    return role === 'ADMIN' || role === 'Administrador';
  }

  isUser(): boolean {
    const role = this.getPayload()?.role;
    return role === 'USER' || role === 'Cliente';
  }


}
