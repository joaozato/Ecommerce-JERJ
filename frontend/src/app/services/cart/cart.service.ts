import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

export interface CartItem<TProduct extends Product = Product> {
  produto: TProduct;
  quantidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  getItems() {
    return [...this.items];
  }

  add(product: Product) {
    const item = this.items.find((cartItem) => cartItem.produto.id === product.id);

    if (item) {
      item.quantidade += 1;
      return;
    }

    this.items = [
      ...this.items,
      { produto: product, quantidade: 1 },
    ];
  }

  decrease(productId: number) {
    this.items = this.items
      .map((item) => item.produto.id === productId
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
      )
      .filter((item) => item.quantidade > 0);
  }

  countItems() {
    return this.items.reduce((total, item) => total + item.quantidade, 0);
  }

  totalPrice() {
    return this.items.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  }
}
