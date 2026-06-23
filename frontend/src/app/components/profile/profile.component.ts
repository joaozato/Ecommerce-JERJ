import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { AuthService } from '../../services/auth/auth.service';
import { PedidoTrackingService, PedidoTrackingStatus } from '../../services/pedido-tracking/pedido-tracking.service';
import { LoggedUser, UserService } from '../../services/user/user.service';

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
    nome: '',
    telefone: '',
    email: '',
  };

  orders: OrderItem[] = [
    { id: 1, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
    { id: 2, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
    { id: 3, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
    { id: 4, produto: 'Apple Iphone Pro Max 16', preco: 7999.99, dataCompra: '16/06/2026', tracking: [] },
  ];

  constructor(
    private authService: AuthService,
    private pedidoTrackingService: PedidoTrackingService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadLoggedUser();
    this.listenOrderTracking();
  }

  ngOnDestroy(): void {
    this.trackingSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private loadLoggedUser() {
    const email = this.authService.getPayload()?.sub;

    if (!email) {
      return;
    }

    this.userService.findByEmail(email).subscribe({
      next: (user) => {
        if (!user) {
          return;
        }

        this.applyLoggedUser(user);
      },
      error: (err) => console.error('Erro ao carregar usuario logado:', err),
    });
  }

  private listenOrderTracking() {
    this.orders.forEach((order) => {
      const subscription = this.pedidoTrackingService.trackPedido(order.id).subscribe({
        next: (trackingStatus) => this.updateOrderTracking(order.id, trackingStatus),
        error: (err) => console.error('Erro ao atualizar rastreio:', err),
      });

      this.trackingSubscriptions.push(subscription);
    });
  }

  private applyLoggedUser(user: LoggedUser) {
    const userInfo = {
      nome: user.nome,
      telefone: user.telefone || 'Nao informado',
      email: user.email,
    };

    this.profile = userInfo;
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
