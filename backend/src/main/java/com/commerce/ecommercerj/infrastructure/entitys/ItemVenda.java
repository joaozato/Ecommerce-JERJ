package com.commerce.ecommercerj.infrastructure.entitys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "itens_venda")
@Entity
public class ItemVenda {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "venda_id", nullable = false)
    @JsonIgnore // Evita loop infinito na serialização caso o frontend puxe a venda inteira
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private produtos produto;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;
}
