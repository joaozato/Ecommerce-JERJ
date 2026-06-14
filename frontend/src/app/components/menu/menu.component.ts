import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideMenu, LucideUserRound } from '@lucide/angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, LucideMenu, LucideUserRound],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Output() menuClick = new EventEmitter<void>();

  isOpen = false;
  categories = [
    ['Tecnologia', 'Celulares', 'Moda'],
    ['Livros', 'Infantil', 'Móveis'],
    ['Casa', 'Música', 'Beleza'],
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuClick.emit();
  }

  closeMenu() {
    this.isOpen = false;
  }
}
