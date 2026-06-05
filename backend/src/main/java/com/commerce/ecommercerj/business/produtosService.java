package com.commerce.ecommercerj.business;

import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import com.commerce.ecommercerj.infrastructure.repository.produtosRepository;

import java.util.Collections;
import java.util.List;
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

    public List<produtos> buscarProdutopornome(String nome) {
        List<produtos> busca = (List<produtos>) repository.findByNomeContainingIgnoreCase(nome);
        if (busca.isEmpty()){
            throw new RuntimeException("Nenhum produto encontrado com esse nome!");
        }
        
        return busca;
    }
    public List<produtos> listarTodos(){
        List<produtos> lista = repository.findAll();

        if (lista.isEmpty()){
            throw new RuntimeException("Nenhum produto no estoque!");
        }
        return lista;
    }

    public void deletaProduto(Integer id){
        repository.deleteById(id);
    }
}
