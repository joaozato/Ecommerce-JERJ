package com.commerce.ecommercerj.infrastructure.entitys;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "produtos")
@Entity

public class produtos {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "Marca",  nullable = false)
    private String marca;

    @Column(name = "Preço",  nullable = false)
    private float preco;

    @Column(name = "Quantidade", nullable = false)
    private int quantidade;

    @Column(name = "Categoria", nullable = false)
    private String categoria;

    @Column(name = "PathImagem")
    private String pathImagem;

}
