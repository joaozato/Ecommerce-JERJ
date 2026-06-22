package com.commerce.ecommercerj.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserDetailsService userDetailsService; // Você vai precisar implementar isso depois conectando no seu UserRepository

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {

        // Ignora a autenticação/jwt em rotas públicas
        String path = request.getServletPath();

        if (path.startsWith("/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = recoverToken(request);

        if (token != null && tokenService.isTokenValid(token)) {
            try {
                // Pega o email que guardamos dentro do token
                String email = tokenService.getEmailFromToken(token);
                
                // Busca o usuário no banco de dados
                UserDetails user = userDetailsService.loadUserByUsername(email);
                
                // Autentica o usuário no contexto do Spring Security
                UsernamePasswordAuthenticationToken authentication = 
                        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                // Ignora falhas de autenticação de tokens inválidos/deletados em rotas públicas
            }
        }

        // Continua o fluxo da requisição
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        // Retorna apenas o token, tirando a palavra "Bearer " da frente
        return authHeader.substring(7);
    }
 {
    
}}
