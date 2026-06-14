package com.commerce.ecommercerj.dto;

// Essa classe representa o JSON que o front-end vai enviar para nós no login
public record AuthRequestDTO(String email, String senha) {
}