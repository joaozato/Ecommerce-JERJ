import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideFlame,
} from '@lucide/angular';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { HeaderComponent } from '../header/header.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { ProductCardComponent, ProductCardItem } from '../product-card/product-card.component';
import { CartService } from '../../services/cart/cart.service';

type HomeProduct = ProductCardItem;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CartModalComponent,
    HeaderComponent,
    LucideChevronLeft,
    LucideChevronRight,
    LucideFlame,
    ProductCardComponent,
  ],
})
export class HomeComponent implements OnInit {

  listaProdutos: HomeProduct[] = [];
  carrinhoAberto = false;
  bannerAtual = 0;
  banners: string[] = [];
  private readonly produtosBase: HomeProduct[] = [
    { id: 1, nome: 'Produto destaque 1', marca: 'Marca', preco: 150.5, custo: 0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem: '' },
    { id: 2, nome: 'Produto destaque 2', marca: 'Marca', preco: 150.5, custo: 0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem: '' },
    { id: 3, nome: 'Produto destaque 3', marca: 'Marca', preco: 150.5, custo: 0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem: '' },
    { id: 4, nome: 'Produto destaque 4', marca: 'Marca', preco: 150.5, custo: 0, quantidade: 0, avaliacoes: 33, valorParcela: 30.1, parcelas: 5, pathImagem: '' },
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listarProdutosDoBanco();
  }

  listarProdutosDoBanco() {
    this.productService.listAll().subscribe({
      next: (dados) => {
        this.listaProdutos = this.mapearProdutos(dados);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  adicionarAoCarrinho(produto: HomeProduct) {
    this.cartService.add(produto);
    this.carrinhoAberto = true;
    console.log('Adicionou ao carrinho:', produto.nome);
  }

  abrirCarrinho() {
    this.carrinhoAberto = !this.carrinhoAberto;
  }

  get totalItensCarrinho() {
    return this.cartService.countItems();
  }

  pesquisarProdutos(termo: string) {
    const nome = termo.trim();

    if (!nome) {
      this.listarProdutosDoBanco();
      return;
    }

    this.productService.searchByName(nome).subscribe({
      next: (dados) => {
        this.listaProdutos = this.mapearProdutos(dados);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao pesquisar produtos:', err);
        this.listaProdutos = [];
        this.cdr.detectChanges();
      },
    });
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
