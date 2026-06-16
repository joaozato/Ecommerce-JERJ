package com.commerce.ecommercerj.business;

import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import com.commerce.ecommercerj.infrastructure.repository.produtosRepository;

import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.commerce.ecommercerj.dto.CheckoutItemDTO;

@Service
public class produtosService {


    private final produtosRepository repository;

    public produtosService(produtosRepository repository) {

        this.repository = repository;
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

    public List<produtos> listarTodos() {
        List<produtos> lista = repository.findAll();

        if (lista.isEmpty()) {
            throw new RuntimeException("Nenhum produto no estoque!");
        }
        return lista;
    }

    public void deletaProduto(Integer id) {
        repository.deleteById(id);
    }

    public void vendaProdutos(Integer id, Integer quantidadeComprada) {
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
    }
    public produtos BuscarByIDProduto(Integer id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("erro!!"));
    }

    @Transactional
    public void processarCheckout(List<CheckoutItemDTO> itens) {
        if (itens == null || itens.isEmpty()) {
            throw new RuntimeException("A lista de itens de checkout não pode ser vazia!");
        }
        for (CheckoutItemDTO item : itens) {
            vendaProdutos(item.id(), item.quantidade());
        }
    }
}