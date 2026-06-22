import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { PedidoTrackingService, PedidoTrackingStatus } from '../../services/pedido-tracking/pedido-tracking.service';

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
  tracking: PedidoTrackingStatus[];
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
export class ProfileComponent implements OnInit, OnDestroy {
  private trackingSubscriptions: Subscription[] = [];

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
    { id: 1, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
    { id: 2, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
    { id: 3, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
    { id: 4, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
  ];

  constructor(private pedidoTrackingService: PedidoTrackingService) { }

  ngOnInit(): void {
    this.orders.forEach((order) => {
      const subscription = this.pedidoTrackingService.trackPedido(order.id).subscribe({
        next: (trackingStatus) => this.updateOrderTracking(order.id, trackingStatus),
        error: (err) => console.error('Erro ao atualizar rastreio:', err),
      });

      this.trackingSubscriptions.push(subscription);
    });
  }

  ngOnDestroy(): void {
    this.trackingSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private updateOrderTracking(orderId: number, trackingStatus: PedidoTrackingStatus) {
    this.orders = this.orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      const tracking = order.tracking.filter((item) => item.progress !== trackingStatus.progress);

      return {
        ...order,
        tracking: [...tracking, trackingStatus].sort((a, b) => a.progress - b.progress),
      };
    });
  }
}
