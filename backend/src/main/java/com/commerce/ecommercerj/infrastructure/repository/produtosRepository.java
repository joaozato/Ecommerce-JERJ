package com.commerce.ecommercerj.infrastructure.repository;

import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface produtosRepository extends JpaRepository<produtos, Integer> {

    List<produtos> findByNomeContainingIgnoreCase(String nome);

    Optional<produtos> findById(Integer id);

    @Transactional
    void deleteById(@NonNull Integer id);
}
