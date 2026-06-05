package com.commerce.ecommercerj.business;

import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import com.commerce.ecommercerj.infrastructure.repository.produtosRepository;
import org.springframework.stereotype.Service;

@Service
public class produtosService {


    private final produtosRepository repository;

    public produtosService(produtosRepository repository) {

        this.repository = repository;
    }

    public void salvaProduto(produtos produtos){
        repository.save(produtos);
    }

    public produtos buscarProdutopornome(String nome) {
        return repository.findByNome(nome).orElseThrow(
                () -> new RuntimeException("Produto não encontrado!")
        );
    }
    public produtos listarTodos(String nome){
        return repository.findAll(nome).orElseThrow(
        () -> new RuntimeException("Nenhum produto no estoque!")
        );
    }

    public void deletaProduto(Integer id){
        repository.deleteById(id);
    }
}
