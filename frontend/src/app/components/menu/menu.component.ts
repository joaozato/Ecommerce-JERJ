import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideMenu, LucideUserRound } from '@lucide/angular';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideMenu, LucideUserRound],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

  constructor(public authService: AuthService) {}

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

  logout(): void {
    this.authService.logout();
  }

}



