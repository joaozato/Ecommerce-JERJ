import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface VendaProduto {
  id: number;
  nome: string;
  marca?: string;
  preco?: number;
  pathImagem?: string;
}

export interface VendaItem {
  id: number;
  produto?: VendaProduto;
  quantidade: number;
}

export interface MinhaCompra {
  id: number;
  faturamento: number;
  dataHora: string;
  itens?: VendaItem[];
}

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private readonly apiUrl = 'http://localhost:8081/vendas';

  constructor(private http: HttpClient) { }

  minhasCompras(): Observable<MinhaCompra[]> {
    return this.http.get<MinhaCompra[]>(`${this.apiUrl}/minhas-compras`);
  }
}
