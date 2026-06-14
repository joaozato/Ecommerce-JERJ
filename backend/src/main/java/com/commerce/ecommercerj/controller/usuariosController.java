package com.commerce.ecommercerj.controller;


import com.commerce.ecommercerj.business.usuariosService;
import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import com.commerce.ecommercerj.infrastructure.entitys.usuarios;
import com.commerce.ecommercerj.infrastructure.repository.produtosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class usuariosController {

    private final usuariosService usuariosService;

    @PostMapping("/Cadastro")
    public ResponseEntity<produtos> salvaUsuario(@RequestBody usuarios usuarios){
        usuariosService.salvaUsuario(usuarios);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/ListarTodos")
    public ResponseEntity<List<usuarios>> listarTodosUsuarios(){
        List<usuarios> lista = usuariosService.listarTodosUsuarios();
        return ResponseEntity.ok().body(lista);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletaUsuario(@RequestParam Integer id){
        usuariosService.deletaUsuario(id);
        return ResponseEntity.ok().build();
    }

}
