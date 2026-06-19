package com.commerce.ecommercerj.infrastructure.repository;

import com.commerce.ecommercerj.infrastructure.entitys.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VendaRepository extends JpaRepository<Venda, Integer> {

    @Query("SELECT COALESCE(SUM(v.faturamento), 0) FROM Venda v")
    float sumFaturamentoTotal();

    @Query("SELECT COALESCE(SUM(v.lucroLiquido), 0) FROM Venda v")
    float sumLucroLiquidoTotal();
}
