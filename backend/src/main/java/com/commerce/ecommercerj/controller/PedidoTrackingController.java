package com.commerce.ecommercerj.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoTrackingController {

    private static class PedidoStatus {
        private String status;
        private int progress;

        public PedidoStatus(String status, int progress) {
            this.status = status;
            this.progress = progress;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public int getProgress() {
            return progress;
        }

        public void setProgress(int progress) {
            this.progress = progress;
        }
    }

    @GetMapping(value = "/{id}/tracking", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter trackPedido(@PathVariable Integer id) {
        // Cria o emissor aqui com 60 seg
        SseEmitter emitter = new SseEmitter(60000L);

        List<PedidoStatus> simulacao = Arrays.asList(
                new PedidoStatus("Processando Pedido", 20),
                new PedidoStatus("Saiu do centro de distribuição", 40),
                new PedidoStatus("Pedido em estoque perto de sua localização", 60),
                new PedidoStatus("Pedido saiu para entrega", 80),
                new PedidoStatus("Pedido chegou na sua residencia", 100));

        new Thread(() -> {
            try {
                for (PedidoStatus status : simulacao) {
                    // envia o status para o front via SSE
                    emitter.send(SseEmitter.event()
                            .id(String.valueOf(System.currentTimeMillis()))
                            .name("tracking") // O Front pode escutar por eventos de 'tracking' ou 'message'
                            .data(status));

                    // Aguarda 10 segundos antes do próximo status, exceto na última iteração
                    if (status.getProgress() < 100) {
                        Thread.sleep(10000);
                    }
                }

                // Finaliza a transmissão assim que a simulação conclui (100%)
                emitter.complete();
            } catch (IOException | InterruptedException e) {
                emitter.completeWithError(e);
            }
        }).start();

        return emitter;
    }
}
