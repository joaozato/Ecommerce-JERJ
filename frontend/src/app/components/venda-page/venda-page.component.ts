import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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
export class VendaPageComponent implements OnDestroy {
  currentStep: CheckoutStep = 'delivery';
  paymentMethod = '';
  showPixQrCode = false;
  pixSecondsRemaining = 10;
  cartItems: CartItem[] = [];
  private pixQrTimer?: ReturnType<typeof setTimeout>;
  private pixCountdownTimer?: ReturnType<typeof setInterval>;
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'HOME', route: '/home' },
    { label: 'Visualizar Produto', route: '/home' },
    { label: 'Compra' },
  ];

  constructor(
    private router: Router,
    private cartService: CartService,
    private changeDetector: ChangeDetectorRef
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

  get isPixPayment() {
    return this.paymentMethod === 'pix';
  }

  goToPayment() {
    this.currentStep = 'payment';
  }

  finishPurchase() {
    if (this.isPixPayment) {
      this.clearPixTimers();

      this.pixSecondsRemaining = 10;
      this.showPixQrCode = true;
      this.pixCountdownTimer = setInterval(() => {
        this.pixSecondsRemaining = Math.max(this.pixSecondsRemaining - 1, 0);
        this.changeDetector.detectChanges();
      }, 1000);
      this.pixQrTimer = setTimeout(() => {
        this.clearPixTimers();
        this.showPixQrCode = false;
        this.currentStep = 'success';
        this.changeDetector.detectChanges();
      }, 10000);
      return;
    }

    this.currentStep = 'success';
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.clearPixTimers();
  }

  private clearPixTimers() {
    if (this.pixQrTimer) {
      clearTimeout(this.pixQrTimer);
      this.pixQrTimer = undefined;
    }

    if (this.pixCountdownTimer) {
      clearInterval(this.pixCountdownTimer);
      this.pixCountdownTimer = undefined;
    }
  }

}
