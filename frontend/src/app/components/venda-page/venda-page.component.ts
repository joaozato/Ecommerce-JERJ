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
    private cartService: CartService
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
    this.currentStep = 'success';
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
