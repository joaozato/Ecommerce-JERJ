package com.commerce.ecommercerj.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class TokenService {

    // Chave secreta para assinar o token (em um projeto real, isso ficaria no application.properties)
    // Coloquei uma string longa aqui apenas para o JWT não reclamar do tamanho da chave
    private static final String SECRET_STRING = "MeuSegredoSuperSecretoParaOProjetoDeEcommerce2026";
    private final SecretKey secretKey = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));
    
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
        Claims claims = Jwts.parser()
                .verifyWith(secretKey) //
                .build()
                .parseSignedClaims(token)    // Nova sintaxe para ler o token assinado
                .getPayload();               // Mudou de getBody() para getPayload()

        return claims.getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            // Se cair aqui, o token expirou, foi alterado ou é inválido
            return false;
        }
    }
}