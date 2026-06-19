package com.commerce.ecommercerj.controller;


import com.commerce.ecommercerj.business.produtosService;
import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import com.commerce.ecommercerj.dto.CheckoutItemDTO;
import lombok.RequiredArgsConstructor;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class produtosController {

    private final produtosService produtosService;

    @PostMapping
    public ResponseEntity<Void> salvaProduto(@RequestBody produtos produtos){
        produtosService.salvaProduto(produtos);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/buscarNome")
    public ResponseEntity<List<produtos>> buscarProdutopornome(@RequestParam String nome){
        List<produtos> resultado = produtosService.buscarProdutopornome(nome);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/listarCategoria")
    public ResponseEntity<List<produtos>> buscarProdutosPorCategoria(@RequestParam String categoria){
        List<produtos> resultado = produtosService.buscarProdutosPorCategoria(categoria);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<List<produtos>> listarTodos(){
        List<produtos> todos = produtosService.listarTodos();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/buscarID")
    public ResponseEntity <produtos> BuscarByIDProduto(@RequestParam Integer id){
        produtos result = produtosService.BuscarByIDProduto(id);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletaProduto(@RequestParam Integer id){
        produtosService.deletaProduto(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/checkout")
    public ResponseEntity<Void> processarCheckout(@RequestBody List<CheckoutItemDTO> itens) {
        produtosService.processarCheckout(itens);
        return ResponseEntity.ok().build();
    }
}
