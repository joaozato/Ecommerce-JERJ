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
  menuPosition = {
    top: 74,
    right: 7,
  };
  categories = [
    ['Tecnologia', 'Celulares', 'Moda'],
    ['Livros', 'Infantil', 'Móveis'],
    ['Casa', 'Música', 'Beleza'],
  ];

  private dragStart = {
    pointerX: 0,
    pointerY: 0,
    top: 0,
    right: 0,
  };
  private isDragging = false;
  private suppressNextClick = false;

  toggleMenu(event?: MouseEvent) {
    if (this.suppressNextClick) {
      event?.preventDefault();
      this.suppressNextClick = false;
      return;
    }

    this.isOpen = !this.isOpen;
    this.menuClick.emit();
  }

  closeMenu() {
    this.isOpen = false;
  }

  startDrag(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement;

    target.setPointerCapture(event.pointerId);
    this.isDragging = true;
    this.dragStart = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      top: this.menuPosition.top,
      right: this.menuPosition.right,
    };
  }

  dragMenu(event: PointerEvent) {
    if (!this.isDragging) {
      return;
    }

    const deltaX = event.clientX - this.dragStart.pointerX;
    const deltaY = event.clientY - this.dragStart.pointerY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      this.suppressNextClick = true;
    }

    const modalSize = Math.min(247, window.innerWidth - 14);

    this.menuPosition = {
      top: this.clamp(this.dragStart.top + deltaY, 0, window.innerHeight - modalSize),
      right: this.clamp(this.dragStart.right - deltaX, 0, window.innerWidth - modalSize),
    };
  }

  endDrag(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement;

    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }

    this.isDragging = false;
  }

  private clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }
}
