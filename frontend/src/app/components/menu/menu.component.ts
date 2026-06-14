import { Component, EventEmitter, Output } from '@angular/core';
import { LucideMenu } from '@lucide/angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [LucideMenu],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Output() menuClick = new EventEmitter<void>();
}
