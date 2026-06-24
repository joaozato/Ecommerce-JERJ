import { RouterLink } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  LucideSearch,
  LucideShoppingCart,
} from '@lucide/angular';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LucideSearch,
    LucideShoppingCart,
    MenuComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() cartItems = 0;

  @Output() cartClick = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }
}
