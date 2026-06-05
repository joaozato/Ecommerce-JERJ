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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "marca",  nullable = false)
    private String marca;

    @Column(name = "preco",  nullable = false)
    private float preco;

    @Column(name = "quantidade", nullable = false)
    private int quantidade;

}
