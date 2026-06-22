import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubmitButtonComponent } from '../../shared/SubmitButton/submit-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideFlame,
  LucideShoppingCart,
  LucideStar,
} from '@lucide/angular';
import { InstallmentOption } from '../../models/installment.model'
import { HeaderComponent } from '../header/header.component';
import { Location } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
//import { AuthService } from '../../services/auth/auth.service';



interface HomeProduct extends Product {
  pathImagem: string;
  avaliacoes: number;
  valorParcela: number;
  parcelas: number;
}

interface CartItem {
  produto: HomeProduct;
  quantidade: number;
}


@Component({
  standalone: true,
  selector: 'app-product-details',
  styleUrls: ['./product-details.component.css'],
  templateUrl: './product-details.component.html',
  imports: [
    CommonModule,             // <-- necessário para utilizar *ngIf e *ngFor
    DecimalPipe,
    LucideStar,
    HeaderComponent,
    BreadcrumbComponent,
    RouterLink,
  ],
})



export class ProductDetailsComponent implements OnInit {

  // Para o carrinho
  //itensCarrinho: CartItem[] = [];
  //carrinhoAberto = false;
  //totalItensCarrinho = 0;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'HOME', route: '/home' },
    { label: 'Visualizar Produto' },
  ];

  cartItems = 0;

  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef, // Força o Angular a re-renderizar o template para evitar erros de req com a API
    private location: Location,
  ) {}



  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id') // Coleta o id do produto para enviar na url
    );


    this.productService
      .searchById(id)
      .subscribe(product => {
        this.product = product;
        // console.log(product)
        this.generateInstallments(product.preco);
        this.cdr.detectChanges(); // Re-render - Coloquei para evitar qualquer erro de renderizar sem os dados da API
      });


  }

  addToCart(qt:any) {
    if (this.cartItems < qt) { // Não deixa ao carrinho uma quantidade maior que a do estoque
      this.cartItems += 1;
    }
  }

  installmentOptions: InstallmentOption[] = [];

  generateInstallments(price: number) {
    const max = 10; // Máximo de parcelas

    this.installmentOptions = [];

    for (let i = 1; i <= max; i++) {
      this.installmentOptions.push({
        installments: i,
        value: price / i
      });
    }

  }

}