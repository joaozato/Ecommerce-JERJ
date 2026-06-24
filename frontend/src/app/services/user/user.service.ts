import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface LoggedUser {
  id: number;
  email: string;
  nome: string;
  cpf?: string;
  telefone?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8081/usuarios';

  constructor(private http: HttpClient) { }

  findByEmail(email: string): Observable<LoggedUser | undefined> {
    return this.http.get<LoggedUser[]>(`${this.apiUrl}/ListarTodos`).pipe(
      map((users) => users.find((user) => user.email === email))
    );
  }
}
