package com.commerce.ecommercerj.business;

import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import com.commerce.ecommercerj.infrastructure.entitys.Venda;
import com.commerce.ecommercerj.infrastructure.repository.produtosRepository;
import com.commerce.ecommercerj.infrastructure.repository.VendaRepository;
import com.commerce.ecommercerj.dto.VendaRealizadaEvent;
import org.springframework.context.ApplicationEventPublisher;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.commerce.ecommercerj.dto.CheckoutItemDTO;

@Service
public class produtosService {

    private final produtosRepository repository;
    private final VendaRepository vendaRepository;
    private final ApplicationEventPublisher eventPublisher;

    public produtosService(produtosRepository repository, VendaRepository vendaRepository, ApplicationEventPublisher eventPublisher) {
        this.repository = repository;
        this.vendaRepository = vendaRepository;
        this.eventPublisher = eventPublisher;
    }

    public void salvaProduto(produtos produtos) {
        repository.save(produtos);
    }

    public List<produtos> buscarProdutopornome(String nome) {
        List<produtos> busca = (List<produtos>) repository.findByNomeContainingIgnoreCase(nome);
        if (busca.isEmpty()) {
            throw new RuntimeException("Nenhum produto encontrado com esse nome!");
        }
        return busca;
    }

    public List<produtos> buscarProdutosPorCategoria(String categoria) {
        List<produtos> busca = repository.findByCategoriaContainingIgnoreCase(categoria);
        if (busca.isEmpty()) {
            throw new RuntimeException("Nenhum produto listado nessa categoria!!");
        }
        return busca;
    }

    public List<produtos> listarTodos() {
        return repository.findAll();
    }

    public void deletaProduto(Integer id) {
        repository.deleteById(id);
    }

    public Venda vendaProdutos(Integer id, Integer quantidadeComprada) {
        produtos produtos = repository.findById(id).orElseThrow(
                () -> new RuntimeException("erro!!"));

        if (produtos.getQuantidade() == 0) {
            throw new RuntimeException("O produto '" + produtos.getNome() + "' esta esgotado!!");
        }
        if (produtos.getQuantidade() < quantidadeComprada) {
            throw new RuntimeException("Estoque insuficiente!" + produtos.getQuantidade() + "unidades disponíveis!");
        }

        int novoQuantidade = produtos.getQuantidade() - quantidadeComprada;
        produtos.setQuantidade(novoQuantidade);

        repository.save(produtos);

        float faturamento = produtos.getPreco() * quantidadeComprada;
        float lucroLiquido = (produtos.getPreco() - produtos.getCusto()) * quantidadeComprada;

        return Venda.builder()
                .faturamento(faturamento)
                .lucroLiquido(lucroLiquido)
                .build();
    }

    public produtos BuscarByIDProduto(Integer id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("erro!!"));
    }

    @Transactional
    public Venda processarCheckout(List<CheckoutItemDTO> itens) {
        if (itens == null || itens.isEmpty()) {
            throw new RuntimeException("A lista de itens de checkout não pode ser vazia!");
        }

        float totalFaturamento = 0f;
        float totalLucro = 0f;

        for (CheckoutItemDTO item : itens) {
            Venda v = vendaProdutos(item.id(), item.quantidade());
            totalFaturamento += v.getFaturamento();
            totalLucro += v.getLucroLiquido();
        }

        Venda vendaFinal = Venda.builder()
                .faturamento(totalFaturamento)
                .lucroLiquido(totalLucro)
                .dataHora(LocalDateTime.now())
                .build();

        Venda vendaSalva = vendaRepository.save(vendaFinal);

        // Dispara o evento para atualizar o painel em tempo real
        eventPublisher.publishEvent(new VendaRealizadaEvent(this));

        return vendaSalva;
    }
}