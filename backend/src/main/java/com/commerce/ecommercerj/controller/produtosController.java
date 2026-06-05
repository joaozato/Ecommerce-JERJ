package com.commerce.ecommercerj.controller;


import com.commerce.ecommercerj.business.produtosService;
import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
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

    @GetMapping("/buscar")
    public ResponseEntity<List<produtos>> buscarProdutopornome(@RequestParam String nome){
        List<produtos> resultado = produtosService.buscarProdutopornome(nome);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping
    public ResponseEntity<List<produtos>> listarTodos(){
        List<produtos> todos = produtosService.listarTodos();
        return ResponseEntity.ok(todos);
    }

    @DeleteMapping
    public ResponseEntity<Void> deletaProduto(@RequestParam Integer id){
        produtosService.deletaProduto(id);
        return ResponseEntity.ok().build();
    }
}
