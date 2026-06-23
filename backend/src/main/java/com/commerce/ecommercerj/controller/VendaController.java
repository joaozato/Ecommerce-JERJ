package com.commerce.ecommercerj.controller;

import com.commerce.ecommercerj.infrastructure.entitys.Venda;
import com.commerce.ecommercerj.infrastructure.repository.VendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vendas")
@RequiredArgsConstructor
public class VendaController {

    private final VendaRepository vendaRepository;

    @GetMapping("/minhas-compras")
    public ResponseEntity<List<Venda>> listarMinhasCompras(Authentication authentication) {
        String email = authentication.getName();
        List<Venda> vendas = vendaRepository.findByUsuarioEmailOrderByDataHoraDesc(email);
        return ResponseEntity.ok(vendas);
    }
}
