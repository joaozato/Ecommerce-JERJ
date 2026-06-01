package com.commerce.ecommercerj.controller;

import com.commerce.ecommercerj.dto.AuthRequestDTO;
import com.commerce.ecommercerj.dto.AuthResponseDTO;
import com.commerce.ecommercerj.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Avisa o Spring que essa classe vai responder requisições via JSON
@RequestMapping("/auth") // Todas as rotas aqui dentro vão começar com /auth
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO body) {
        
       

        // Uma lógica diferente se o email tiver a palavra "admin", geramos token de vendedor.
        // Se não tiver, geramos token de usuário comum.
        String role = body.email().contains("admin") ? "ADMIN" : "USER";
        
        // Chama a nossa fábrica de tokens passando o email e o papel
        String token = tokenService.generateToken(body.email(), role);
        
        // Devolve o token empacotado no nosso Response DTO com o status 200 (OK)
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }
}