import { Component, OnInit } from '@angular/core';
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
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';

interface HomeProduct extends Product {
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
  private readonly produtosBase: HomeProduct[] = [
    { id: 1, nome: 'Produto destaque 1', marca: 'Marca', preco: 150.5, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
    { id: 2, nome: 'Produto destaque 2', marca: 'Marca', preco: 150.5, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
    { id: 3, nome: 'Produto destaque 3', marca: 'Marca', preco: 150.5, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
    { id: 4, nome: 'Produto destaque 4', marca: 'Marca', preco: 150.5, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5 },
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listaProdutos = this.produtosBase;
    this.listarProdutosDoBanco();
  }

  listarProdutosDoBanco() {
    this.productService.listAll().subscribe({
      next: (dados) => this.listaProdutos = this.mapearProdutos(dados),
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
    const nome = termo.trim();

    if (!nome) {
      this.listarProdutosDoBanco();
      return;
    }

    this.productService.searchByName(nome).subscribe({
      next: (dados) => this.listaProdutos = this.mapearProdutos(dados),
      error: (err) => {
        console.error('Erro ao pesquisar produtos:', err);
        this.listaProdutos = [];
      },
    });
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

  private mapearProdutos(produtos: Product[]): HomeProduct[] {
    return produtos.map((produto) => ({
      ...produto,
      avaliacoes: 33,
      valorParcela: produto.preco / 5,
      parcelas: 5,
    }));
  }
}
