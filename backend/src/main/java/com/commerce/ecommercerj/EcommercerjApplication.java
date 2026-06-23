package com.commerce.ecommercerj;

import com.commerce.ecommercerj.infrastructure.entitys.produtos;
import com.commerce.ecommercerj.infrastructure.repository.produtosRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class EcommercerjApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommercerjApplication.class, args);
	}


}
