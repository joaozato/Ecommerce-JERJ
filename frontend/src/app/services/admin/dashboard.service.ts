// dashboard.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Os nomes estão em português porque o nosso back estava codando em português
export interface DashboardStatus {
  faturamentoTotal: number;
  lucroLiquidoTotal: number;
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  connectDashboard() {

    return new Observable<any>(observer => {

      const source = new EventSource(
        'http://localhost:8080/admin/dashboard/stream' // URL do SSE
      );


      source.addEventListener(
        'dashboard_update', // Message do evento criada pelo back
        (event: MessageEvent) => {

          //console.log('EVENTO SSE RECEBIDO:', event.data);

          observer.next(JSON.parse(event.data)); // Prepara os dados para poder requisitar
        }
      );


      source.onerror = (error) => {

        console.error(
          "Erro SSE",
          error
        );

        observer.error(error);

        source.close(); // Fecha a conexão SSE
      };



    });

  }
}
