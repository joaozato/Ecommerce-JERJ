import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideFlame,
} from '@lucide/angular';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { ProductCardComponent, ProductCardItem } from '../product-card/product-card.component';
import { CartItem, CartService } from '../../services/cart/cart.service';

type HomeProduct = ProductCardItem;

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
    MenuComponent,
    ProductCardComponent,

  ],
})
export class HomeComponent implements OnInit {

  listaProdutos: HomeProduct[] = [];
  itensCarrinho: CartItem[] = [];
  carrinhoAberto = false;
  totalItensCarrinho = 0;
  bannerAtual = 0;
  banners: string[] = [];
  private readonly produtosBase: HomeProduct[] = [
    { id: 1, nome: 'Produto destaque 1', marca: 'Marca', preco: 150.5, custo:0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem:"" },
    { id: 2, nome: 'Produto destaque 2', marca: 'Marca', preco: 150.5, custo:0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem:"" },
    { id: 3, nome: 'Produto destaque 3', marca: 'Marca', preco: 150.5, custo:0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem:"" },
    { id: 4, nome: 'Produto destaque 4', marca: 'Marca', preco: 150.5, custo:0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem:"" },
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listaProdutos = this.produtosBase;
    this.sincronizarCarrinho();
  }

  listarProdutosDoBanco() {
    this.productService.listAll().subscribe({
      next: (dados) => this.listaProdutos = this.mapearProdutos(dados),
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }

  adicionarAoCarrinho(produto: HomeProduct) {
    this.cartService.add(produto);
    this.sincronizarCarrinho();
    this.carrinhoAberto = true;
    console.log('Adicionou ao carrinho:', produto.nome);
  }


  abrirCarrinho() {
    this.carrinhoAberto = !this.carrinhoAberto;
  }

  removerDoCarrinho(produtoId: number) {
    this.cartService.decrease(produtoId);
    this.sincronizarCarrinho();
  }

  get totalCarrinho() {
    return this.cartService.totalPrice();
  }

  comprarCarrinho() {
    if (!this.itensCarrinho.length) {
      return;
    }

    this.router.navigate(['/venda']);
  }

  pesquisarProdutos(termo: string) {
    const nome = termo.trim();

    if (!nome) {

      this.listaProdutos = this.produtosBase;

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

  private sincronizarCarrinho() {
    this.itensCarrinho = this.cartService.getItems() as CartItem<HomeProduct>[];
    this.totalItensCarrinho = this.cartService.countItems();
  }
}
