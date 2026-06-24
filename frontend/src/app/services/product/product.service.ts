import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct } from '../../models/create-product.model';
import { CheckoutItem, Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8081/produtos';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/listarTodos`);
    return this.http.get<Product[]>(
      `${this.apiUrl}/listarTodos`
    );
  }

  add(product: CreateProduct): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}`,
      product
    );
  }


  delete(id:number): Observable<void>{
    return this.http.delete<void>(
      `${this.apiUrl}/delete`,
      {
        params: {
          id
        }
      }
    );

  }

  searchByName(nome: string): Observable<Product[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<Product[]>(`${this.apiUrl}/buscarNome`, {params});
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

  searchById(id: number) {
    return this.http.get<Product>(
      `${this.apiUrl}/buscarID?id=${id}`
    );
  }

}
