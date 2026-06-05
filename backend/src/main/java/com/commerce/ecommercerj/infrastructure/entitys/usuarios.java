package com.commerce.ecommercerj.infrastructure.entitys;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "usuarios")
@Entity

public class usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf", unique = true, length = 11)
    private String cpf;

    @Column(name = "senha")
    private String senha;

    @Column(name = "telefone")
    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipodeUsuario role;
}
