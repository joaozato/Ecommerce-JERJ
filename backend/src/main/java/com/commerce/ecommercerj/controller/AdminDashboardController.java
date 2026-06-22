package com.commerce.ecommercerj.controller;

import com.commerce.ecommercerj.dto.VendaRealizadaEvent;
import com.commerce.ecommercerj.infrastructure.repository.VendaRepository;
import org.springframework.context.event.EventListener;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
@CrossOrigin(
        origins = "http://localhost:4200"
)
@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    private final VendaRepository vendaRepository;
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public AdminDashboardController(VendaRepository vendaRepository) {
        this.vendaRepository = vendaRepository;
    }

    private static class LucroStatus {
        private float faturamentoTotal;
        private float lucroLiquidoTotal;

        public LucroStatus(float faturamentoTotal, float lucroLiquidoTotal) {
            this.faturamentoTotal = faturamentoTotal;
            this.lucroLiquidoTotal = lucroLiquidoTotal;
        }

        public float getFaturamentoTotal() {
            return faturamentoTotal;
        }

        public float getLucroLiquidoTotal() {
            return lucroLiquidoTotal;
        }
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamDashboard() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE); // Conexão que não expira
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        // Envia o estado atual logo ao conectar
        try {
            enviarAtualizacao(emitter);
        } catch (Exception e) {
            emitter.completeWithError(e);
        }

        return emitter;
    }

    @EventListener
    public void onVendaRealizada(VendaRealizadaEvent event) {
        // Quando uma nova venda ocorre, atualizamos todos os painéis conectados
        List<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                enviarAtualizacao(emitter);
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        emitters.removeAll(deadEmitters);
    }

    private void enviarAtualizacao(SseEmitter emitter) throws Exception {
        float totalFaturamento = vendaRepository.sumFaturamentoTotal();
        float totalLucro = vendaRepository.sumLucroLiquidoTotal();

        LucroStatus status = new LucroStatus(totalFaturamento, totalLucro);
        emitter.send(SseEmitter.event()
                .id(String.valueOf(System.currentTimeMillis()))
                .name("dashboard_update") // Nome do evento para o frontend escutar
                .data(status));
    }
}
