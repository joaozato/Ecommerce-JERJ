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
import { HeaderComponent } from '../header/header.component';

type CheckoutStep = 'delivery' | 'payment' | 'success';

@Component({
  selector: 'app-venda-page',
  standalone: true,
  imports: [
    CommonModule,
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

  constructor(private router: Router) { }

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
