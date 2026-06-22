import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css',
})
export class CartModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  get items() {
    return this.cartService.getItems();
  }

  get totalItems() {
    return this.cartService.countItems();
  }

  get total() {
    return this.cartService.totalPrice();
  }

  close() {
    this.closed.emit();
  }

  remove(productId: number) {
    this.cartService.decrease(productId);
  }

  buy() {
    if (!this.items.length) {
      return;
    }

    this.router.navigate(['/venda']);
    this.close();
  }
}
