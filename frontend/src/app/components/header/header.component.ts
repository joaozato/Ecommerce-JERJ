import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  LucideSearch,
  LucideShoppingCart,
  LucideSmile,
} from '@lucide/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LucideSearch,
    LucideShoppingCart,
    LucideSmile,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() cartItems = 0;
  @Input() brandName = 'RJEJ';

  @Output() cartClick = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }
}
