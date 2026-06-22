import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideShoppingCart, LucideStar } from '@lucide/angular';
import { Product } from '../../models/product.model';

export interface ProductCardItem extends Product {
  avaliacoes: number;
  valorParcela: number;
  parcelas: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideShoppingCart, LucideStar],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: ProductCardItem;
  @Input() compact = false;
  @Output() addToCart = new EventEmitter<ProductCardItem>();

  onAddToCart(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }
}
