package com.commerce.ecommercerj.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Cors Habilitado para aceitar reqs do Angular
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(form -> form.disable()) // Força a desativação da tela de login HTML
                .httpBasic(basic -> basic.disable()) // Força a desativação de pop-ups de login do navegador
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**").permitAll() // Rota de login livre
                        .requestMatchers(HttpMethod.POST, "/usuarios/Cadastro").permitAll() // Cadastro livre
                        .requestMatchers(HttpMethod.POST, "/produtos/checkout").permitAll() // Checkout livre para todos
                        .requestMatchers(HttpMethod.POST, "/produtos").hasRole("ADMIN") // Apenas ADMIN cadastra produto
                        .requestMatchers(HttpMethod.DELETE, "/produtos").hasRole("ADMIN") // Apenas ADMIN deleta produto
                        .anyRequest().permitAll() // Demais rotas (como GET produtos) liberadas
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class) // Habilita a validação do token
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // URL do front
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*")); // Permite qualquer tipo de Header na requisição
        configuration.setAllowCredentials(true); // Permite credenciais JWT na comunicação CORS

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica para todos os endpoints
        return source;
    }
}