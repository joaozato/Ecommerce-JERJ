package com.commerce.ecommercerj.controller;


import com.commerce.ecommercerj.business.produtosService;
import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import lombok.RequiredArgsConstructor;
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

    @GetMapping
    public ResponseEntity<produtos> buscarProdutopornome(@RequestParam String nome){
        return ResponseEntity.ok(produtosService.buscarProdutopornome(nome));

    }

    @DeleteMapping
    public ResponseEntity<Void> deletaProduto(@RequestParam Integer id){
        produtosService.deletaProduto(id);
        return ResponseEntity.ok().build();
    }
}
