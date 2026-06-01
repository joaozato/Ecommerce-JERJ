package com.commerce.ecommercerj.dto;

// Essa classe representa o JSON que o front-end vai enviar para nós
public record AuthRequestDTO(String email, String nome, String cpf) {
}