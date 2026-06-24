import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

export interface PedidoTrackingStatus {
  status: string;
  progress: number;
}

@Injectable({
  providedIn: 'root',
})
export class PedidoTrackingService {
  private readonly apiUrl = 'http://localhost:8081/pedidos';

  constructor(private zone: NgZone) { }

  trackPedido(pedidoId: number): Observable<PedidoTrackingStatus> {
    return new Observable((observer) => {
      const eventSource = new EventSource(`${this.apiUrl}/${pedidoId}/tracking`);

      const handleTracking = (event: MessageEvent) => {
        this.zone.run(() => {
          observer.next(JSON.parse(event.data) as PedidoTrackingStatus);
        });
      };

      const handleError = () => {
        eventSource.close();
        this.zone.run(() => observer.complete());
      };

      eventSource.addEventListener('tracking', handleTracking);
      eventSource.onerror = handleError;

      return () => {
        eventSource.removeEventListener('tracking', handleTracking);
        eventSource.close();
      };
    });
  }
}
