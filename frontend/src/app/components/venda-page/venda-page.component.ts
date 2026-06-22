import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideCheck,
  LucideCreditCard,
  LucideInfo,
  LucideMapPin,
  LucideShoppingCart,
} from '@lucide/angular';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';

type CheckoutStep = 'delivery' | 'payment' | 'success';

@Component({
  selector: 'app-venda-page',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    HeaderComponent,
    LucideCheck,
    LucideCreditCard,
    LucideInfo,
    LucideMapPin,
    LucideShoppingCart,
  ],
  templateUrl: './venda-page.component.html',
  styleUrl: './venda-page.component.css',
})
export class VendaPageComponent {
  currentStep: CheckoutStep = 'delivery';
  cartItems: CartItem[] = [];
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'HOME', route: '/home' },
    { label: 'Visualizar Produto', route: '/home' },
    { label: 'Compra' },
  ];

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.cartItems = this.cartService.getItems();
  }

  get totalItensCarrinho() {
    return this.cartService.countItems();
  }

  get totalCarrinho() {
    return this.cartService.totalPrice();
  }

  get isDeliveryStep() {
    return this.currentStep === 'delivery';
  }

  get isPaymentStep() {
    return this.currentStep === 'payment';
  }

  get isSuccessStep() {
    return this.currentStep === 'success';
  }

  goToPayment() {
    this.currentStep = 'payment';
  }

  finishPurchase() {
    const checkoutItems = this.cartItems.map(item => ({
      id: item.produto.id,
      quantidade: item.quantidade
    }));

    this.productService.checkout(checkoutItems).subscribe({
      next: () => {
        this.cartService.clear();
        this.cartItems = [];
        this.currentStep = 'success';
      },
      error: (err) => {
        console.error('Erro ao realizar o checkout:', err);
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
