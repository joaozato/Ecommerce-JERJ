import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  searchByName(nome: string): Observable<Product[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<Product[]>(`${this.apiUrl}/buscar`, { params });
  }

  searchById(id: number) {
    return this.http.get<Product>(
      `${this.apiUrl}/buscarID?id=${id}`
    );
  }

}
