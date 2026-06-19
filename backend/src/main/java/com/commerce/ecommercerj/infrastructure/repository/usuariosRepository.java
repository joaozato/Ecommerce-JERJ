package com.commerce.ecommercerj.infrastructure.repository;

import com.commerce.ecommercerj.infrastructure.entitys.usuarios;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface usuariosRepository extends JpaRepository<usuarios, Integer> {

    boolean existsByEmail(String email);
    Optional<usuarios> findByEmail(String email);
    boolean existsByCpf(String cpf);

    @Transactional
    void deleteById(@NonNull Integer id);
}
