package com.commerce.ecommercerj.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class TokenService {

    // Chave secreta para assinar o token (em um projeto real, isso ficaria no application.properties)
    // Coloquei uma string longa aqui apenas para o JWT não reclamar do tamanho da chave
    private static final String SECRET_STRING = "MeuSegredoSuperSecretoParaOProjetoDeEcommerce2026";
    private final Key secretKey = Keys.hmacShaKeyFor(SECRET_STRING.getBytes());
    
    // Tempo de expiração do token (ex: 2 horas)
    private static final long EXPIRATION_TIME = 7200000; 

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role) // Guardamos a role (USER ou ADMIN) dentro do token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        
        return claims.getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // Se cair aqui, o token expirou, foi alterado ou é inválido
            return false;
        }
    }
}