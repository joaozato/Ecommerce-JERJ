import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideFlame,
  LucideShoppingCart,
  LucideStar,
} from '@lucide/angular';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

interface HomeProduct {
  id: number;
  nome: string;
  preco: number;
  avaliacoes: number;
  valorParcela: number;
  parcelas: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    LucideChevronLeft,
    LucideChevronRight,
    LucideFlame,
    LucideShoppingCart,
    LucideStar,
    MenuComponent,
  ],
})
export class HomeComponent implements OnInit {

  listaProdutos: HomeProduct[] = [];
  totalItensCarrinho = 0;
  bannerAtual = 0;
  banners: string[] = [];
  private readonly API = 'http://localhost:8080/produtos';
  private readonly produtosBase: HomeProduct[] = [
    { id: 1, nome: 'Produto destaque 1', preco: 150.5, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
    { id: 2, nome: 'Produto destaque 2', preco: 150.5, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
    { id: 3, nome: 'Produto destaque 3', preco: 150.5, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
    { id: 4, nome: 'Produto destaque 4', preco: 150.5, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listaProdutos = this.produtosBase;
    this.listarProdutosDoBanco();
  }

  listarProdutosDoBanco() {
    this.http.get<any[]>(this.API).subscribe({
      next: (dados) => {
        this.listaProdutos = dados.map((prod, index) => ({
          id: prod.id ?? index + 1,
          ...prod,
          avaliacoes: 33,
          valorParcela: prod.preco / 5,
          parcelas: 5,
        }));
      },
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }

  adicionarAoCarrinho(produto: HomeProduct) {
    this.totalItensCarrinho += 1;
    console.log('Adicionou ao carrinho:', produto.nome);
  }

  abrirCarrinho() {
    console.log('Abrir carrinho');
  }

  pesquisarProdutos(termo: string) {
    console.log('Pesquisar produtos:', termo);
  }

  abrirMenu() {
    console.log('Abrir menu');
  }

  bannerAnterior() {
    if (!this.banners.length) {
      return;
    }

    this.bannerAtual = this.bannerAtual === 0
      ? this.banners.length - 1
      : this.bannerAtual - 1;
  }

  proximoBanner() {
    if (!this.banners.length) {
      return;
    }

    this.bannerAtual = (this.bannerAtual + 1) % this.banners.length;
  }
}
