# 🛒 Ecommerce-JERJ

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Uma plataforma de e-commerce robusta e moderna, desenvolvida com foco em escalabilidade e experiência do usuário. O projeto utiliza uma arquitetura desacoplada com um backend em Spring Boot e um frontend SPA em Angular.

---

## 🚀 Funcionalidades

### 👤 Área do Cliente
* **Autenticação:** Sistema de login e cadastro seguro utilizando JWT (JSON Web Tokens).
* **Catálogo de Produtos:** Visualização detalhada de produtos com filtros e categorias.
* **Carrinho e Checkout:** Experiência de compra fluida.
* **Histórico:** Acompanhamento de pedidos e histórico de compras.
* **Social:** Sistema de avaliações e comentários em produtos.

### 🔐 Área Administrativa
* **Dashboard:** Visão geral de métricas como lucro e desempenho.
* **Gestão de Inventário:** Cadastro, edição e exclusão de produtos.
* **Controle de Estoque:** Monitoramento em tempo real das quantidades disponíveis.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 17** com **Spring Boot 4.0**
* **Spring Security** para autenticação e autorização
* **Spring Data JPA** para persistência de dados
* **PostgreSQL** como banco de dados relacional
* **Lombok** para redução de código boilerplate
* **JJWT** para geração e validação de tokens JWT

### Frontend
* **Angular** (Versão 21+)
* **Tailwind CSS** para estilização moderna e responsiva
* **RxJS** para programação reativa
* **TypeScript** para tipagem estática e segurança

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
* Java JDK 17
* Maven 3.x
* Node.js & npm (v20+)
* PostgreSQL 16+

### 1. Configuração do Banco de Dados
Crie um banco de dados no PostgreSQL chamado `ecommerce`. Configure o arquivo `backend/src/main/resources/application.properties` com suas credenciais:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### 2. Executando o Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Executando o Frontend
```bash
cd frontend
npm install
npm start
```
O frontend estará disponível em `http://localhost:4200`.

---

## 🛣️ Endpoints Principais (API)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Autenticação de usuário |
| `POST` | `/auth/register` | Cadastro de novo usuário |
| `GET` | `/produtos` | Lista todos os produtos |
| `POST` | `/produtos` | Cadastro de produto (Admin) |
| `POST` | `/comprar` | Finalização de compra |
| `GET` | `/admin/lucro` | Visualização de métricas (Admin) |

---



**Desenvolvedores:**
- José Filipe Marques (🔗 *https://github.com/JHOWSEF* \)
- Eduardo Pires(🔗 *https://github.com/EOEDUZADA*)
- João Rodrigues(🔗 *https://github.com/joaozato*)
- Rafaela Nunes (🔗 *https://github.com/rfanunes*)

---

## 📝 Observações
Este projeto é um trabalho acadêmico/experimental e está em constante evolução. Sinta-se à vontade para explorar e contribuir!
