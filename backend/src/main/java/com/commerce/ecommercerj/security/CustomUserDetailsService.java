package com.commerce.ecommercerj.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service // Essa anotação é o que o Spring estava procurando!
public class CustomUserDetailsService implements UserDetailsService {

    // Futuramente, você e sua dupla vão injetar o UserRepository aqui:
    // @Autowired
    // private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Como você ainda não criou as tabelas no SQLite, vamos deixar mockado.
        // O Spring só precisa saber que essa classe existe para conseguir iniciar.
        
        // Quando o banco estiver pronto, o código real será parecido com isso:
        // return userRepository.findByEmail(username)
        //         .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        throw new UsernameNotFoundException("Banco de dados de usuários ainda não conectado");
    }
}