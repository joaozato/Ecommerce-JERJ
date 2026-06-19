package com.commerce.ecommercerj.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.commerce.ecommercerj.dto.AuthRequestDTO;
import com.commerce.ecommercerj.dto.AuthResponseDTO;
import com.commerce.ecommercerj.infrastructure.entitys.usuarios;
import com.commerce.ecommercerj.infrastructure.repository.usuariosRepository;
import com.commerce.ecommercerj.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Avisa o Spring que essa classe vai responder requisições via JSON
@RequestMapping("/auth") // Todas as rotas aqui dentro vão começar com /auth
@CrossOrigin(origins = "http://localhost:4200") // URL do Angular
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private usuariosRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO body) {
        // Busca o usuário real no banco
        usuarios usuario = userRepository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("E-mail não cadastrado!"));

        // Compara a senha em texto
        if (!usuario.getSenha().equals(body.senha())) {
            throw new RuntimeException("Senha incorreta!");
        }

        // Gera o token passando a role que está salva na tabela de usuários ("USER" ou "ADMIN")
        String token = tokenService.generateToken(usuario.getEmail(), usuario.getRole());
        
        // Devolve o token empacotado no nosso Response DTO com o status 200 (OK)
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }
}