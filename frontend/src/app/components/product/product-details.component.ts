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
import {  CartModalComponent  } from '../cart-modal/cart-modal.component';
import {CartService} from '../../services/cart/cart.service';
import {ProductCardItem} from '../product-card/product-card.component';

//import { AuthService } from '../../services/auth/auth.service';

type HomeProduct = ProductCardItem;


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
    CartModalComponent,
  ],
})



export class ProductDetailsComponent implements OnInit {

  // Para o carrinho

  cartOpen = false; // Carrinho está fechado

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'HOME', route: '/home' },
    { label: 'Visualizar Produto' },
  ];

  product?: Product; // Interface do produto - Parametros necessários

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
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

  //addToCart(qt:any) {
    //if (this.cartItems < qt) { // Não deixa ao carrinho uma quantidade maior que a do estoque
      //this.cartItems += 1;
    //}
  //}

  addToCart() {
    if (!this.product) {
      return;
    }

    this.cartService.add(this.product);
    this.cartOpen = true;
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  get cartItems() {
    console.log('carrinho está aqui')
    return this.cartService.countItems();
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
