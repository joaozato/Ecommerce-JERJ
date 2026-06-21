package com.commerce.ecommercerj.infrastructure.config;

import com.commerce.ecommercerj.infrastructure.entitys.usuarios;
import com.commerce.ecommercerj.infrastructure.repository.usuariosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AdminUserConfig implements CommandLineRunner {

    private final usuariosRepository repository;

    @Override
    public void run(String... args) throws Exception {
        
        // Verifica se já existe um administrador pelo e-mail
        String adminEmail = "admin@admin.com";
        
        if (repository.findByEmail(adminEmail).isEmpty()) {
            usuarios admin = usuarios.builder()
                    .nome("Administrador")
                    .email(adminEmail)
                    .senha("admin123")
                    .cpf("00000000000")
                    .telefone("00000000000")
                    .role("Administrador")
                    .build();

            repository.save(admin);
            System.out.println("Usuário Administrador criado com sucesso!");
            System.out.println("E-mail: " + adminEmail);
            System.out.println("Senha: admin123");
        } else {
            System.out.println("Usuário Administrador já existe no banco de dados.");
        }
    }
}
