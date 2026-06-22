import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideMenu, LucideUserRound } from '@lucide/angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideMenu, LucideUserRound],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Output() menuClick = new EventEmitter<void>();

  isOpen = false;
  categories = [
    ['Tecnologia', 'Celulares', 'Moda'],
    ['Livros', 'Infantil', 'Moveis'],
    ['Casa', 'Musica', 'Beleza'],
  ];

  toggleMenu(event?: MouseEvent) {
    this.isOpen = !this.isOpen;
    this.menuClick.emit();
  }

  closeMenu() {
    this.isOpen = false;
  }

  categoryRoute(category: string) {
    return ['/categoria', category.toLowerCase().replace(/\s+/g, '-')];
  }
}

