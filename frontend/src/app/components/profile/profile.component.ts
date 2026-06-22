import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

interface ProfileInfo {
  nome: string;
  telefone: string;
  email: string;
}

interface OrderItem {
  id: number;
  produto: string;
  preco: number;
  dataCompra: string;
  status: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    HeaderComponent,
    MenuComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'HOME', route: '/home' },
    { label: 'Meu perfil' },
  ];

  profile: ProfileInfo = {
    nome: 'Rafaela Goulart',
    telefone: '53 992107139',
    email: 'rafa@gmail.com',
  };

  savedAddress = {
    nome: 'Rafaela Goulart',
    telefone: '53 992107139',
    email: 'rafa@gmail.com',
  };

  orders: OrderItem[] = [
    { id: 1, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', status: 'Em trânsito.....' },
    { id: 2, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', status: 'Em trânsito.....' },
    { id: 3, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', status: 'Em trânsito.....' },
    { id: 4, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', status: 'Em trânsito.....' },
  ];
}
