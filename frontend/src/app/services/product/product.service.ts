import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutItem, Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/listarTodos`);
  }

  searchByName(nome: string): Observable<Product[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<Product[]>(`${this.apiUrl}/buscarNome`, { params });
  }

  listByCategory(categoria: string): Observable<Product[]> {
    const params = new HttpParams().set('categoria', categoria);
    return this.http.get<Product[]>(`${this.apiUrl}/listarCategoria`, { params });
  }

  findById(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Product>(`${this.apiUrl}/buscarID`, { params });
  }

  checkout(items: CheckoutItem[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/checkout`, items);
  }
}
