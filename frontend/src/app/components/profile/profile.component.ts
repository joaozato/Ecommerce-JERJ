import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth/auth.service';
import { PedidoTrackingService, PedidoTrackingStatus } from '../../services/pedido-tracking/pedido-tracking.service';
import { LoggedUser, UserService } from '../../services/user/user.service';
import { MinhaCompra, VendaItem, VendaService } from '../../services/venda/venda.service';

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
  imagem?: string;
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

  orders: OrderItem[] = [];
  isOrdersLoading = true;

  constructor(
    private authService: AuthService,
    private pedidoTrackingService: PedidoTrackingService,
    private userService: UserService,
    private vendaService: VendaService
  ) { }

  ngOnInit(): void {
    this.loadLoggedUser();
    this.loadOrders();
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
    this.trackingSubscriptions.forEach((subscription) => subscription.unsubscribe());
    this.trackingSubscriptions = [];

    const orderIds = [...new Set(this.orders.map((order) => order.id))];

    orderIds.forEach((orderId) => {
      const subscription = this.pedidoTrackingService.trackPedido(orderId).subscribe({
        next: (trackingStatus) => this.updateOrderTracking(orderId, trackingStatus),
        error: (err) => console.error('Erro ao atualizar rastreio:', err),
      });

      this.trackingSubscriptions.push(subscription);
    });
  }

  private loadOrders() {
    this.isOrdersLoading = true;

    this.vendaService.minhasCompras().subscribe({
      next: (compras) => {
        this.orders = (compras || []).flatMap((compra) => this.mapOrders(compra));
        this.isOrdersLoading = false;
        this.listenOrderTracking();
      },
      error: (err) => {
        console.error('Erro ao carregar minhas compras:', err);
        this.orders = [];
        this.isOrdersLoading = false;
      },
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

  private mapOrders(compra: MinhaCompra): OrderItem[] {
    if (!compra.itens?.length) {
      return [this.createOrderItem(compra)];
    }

    return compra.itens.map((item) => this.createOrderItem(compra, item));
  }

  private createOrderItem(compra: MinhaCompra, item?: VendaItem): OrderItem {
    return {
      id: compra.id,
      produto: item?.produto?.nome || 'Produto',
      preco: item?.produto?.preco ? item.produto.preco * item.quantidade : compra.faturamento,
      dataCompra: this.formatDate(compra.dataHora),
      imagem: item?.produto?.pathImagem,
      tracking: [],
    };
  }

  private formatDate(date: string) {
    if (!date) {
      return 'Nao informado';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Nao informado';
    }

    return parsedDate.toLocaleDateString('pt-BR');
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
