package com.commerce.ecommercerj.business;

import com.commerce.ecommercerj.infrastructure.entitys.usuarios;
import com.commerce.ecommercerj.infrastructure.repository.usuariosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class usuariosService {

    private final usuariosRepository repository;

    public usuariosService(usuariosRepository repository) {
        this.repository = repository;
    }

    public void salvaUsuario(usuarios usuario){

        if (repository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Este e-mail já está cadastrado no sistema!");
        }

        if (repository.existsByCpf(usuario.getCpf())) {
            throw new RuntimeException("Este CPF já está cadastrado no sistema!");
        }
        repository.save(usuario);
    }

    public List<usuarios> listarTodosUsuarios() {
        List<usuarios> lista = repository.findAll();
        if (lista.isEmpty()) {
            throw new RuntimeException("Nenhum usuário cadastrado!");
        }
        return lista;
    }
    public void deletaUsuario(Integer id){
        repository.deleteById(id);
    }

    public void editarUsuario(usuarios usuario){
        
    }
}
