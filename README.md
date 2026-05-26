# Instruções para instalação do ambiente

# Backend - E-commerce | Guia de Configuração do Ambiente

## Visão Geral

Este projeto consiste no desenvolvimento do backend de um sistema de E-commerce utilizando Java com Spring Boot, PostgreSQL e autenticação JWT.

O objetivo é fornecer APIs para gerenciamento de usuários, autenticação, produtos, pedidos, estoque, comentários e funcionalidades administrativas.

Tecnologias principais:

* Java
* Spring Boot
* Spring Security
* JWT
* PostgreSQL


---

# Pré-requisitos

Antes de iniciar, instale:

### Java JDK

Verifique:

```bash
java -version
```

Versão recomendada:

```bash
Java 21
```

Download:

[https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)

ou

[https://adoptium.net/](https://adoptium.net/)

---

### Maven

Verifique:

```bash
mvn -version
```

Download:

[https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

---

### PostgreSQL

Verifique:

```bash
psql --version
```

Download:

[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Versão sugerida:

```text
PostgreSQL 16+
```

---

### IntelliJ IDEA

IDE recomendada:

Community ou Ultimate.

Download:

[https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)

---

### Postman

Ferramenta para testar endpoints.

[https://www.postman.com/](https://www.postman.com/)

---

# Clonar projeto

```bash
git clone URL_DO_REPOSITORIO
```

Entrar na pasta:

```bash
cd ecommerce-backend
```

---

# Criar projeto Spring Boot

Acessar:

[https://start.spring.io/](https://start.spring.io/)

Configurações:

Project:

```text
Maven
```

Language:

```text
Java
```

Spring Boot:

```text
3.x
```

Group:

```text
com.ecommerce
```

Artifact:

```text
ecommerce
```

Packaging:

```text
Jar
```

Java:

```text
21
```

Adicionar dependências:

* Spring Web
* Spring Security
* Spring Data JPA
* PostgreSQL Driver
* Lombok
* Validation
* JWT

Gerar projeto.

---

# Estrutura do projeto

Organização recomendada:

```text
src/main/java/com/ecommerce

├── config
├── controller
├── dto
├── entity
├── repository
├── service
├── security
├── exception
├── util
```

Descrição:

controller
→ recebe requisições HTTP

service
→ regras de negócio

repository
→ acesso ao banco

entity
→ tabelas

security
→ JWT e autenticação

dto
→ objetos de entrada/saída

---

# Configurar PostgreSQL

Criar banco:

```sql
CREATE DATABASE ecommerce;
```

Criar usuário:

```sql
CREATE USER ecommerce_user
WITH PASSWORD '123456';

GRANT ALL PRIVILEGES
ON DATABASE ecommerce
TO ecommerce_user;
```

---

# Configurar application.properties

Local:

```text
src/main/resources/application.properties
```

Adicionar:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=ecommerce_user
spring.datasource.password=123456

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

jwt.secret=sua_chave_super_secreta
jwt.expiration=86400000
```

---

# Rodando aplicação

Via IntelliJ:

Executar:

```text
EcommerceApplication.java
```

Ou terminal:

```bash
mvn spring-boot:run
```

Aplicação disponível:

```text
http://localhost:8080
```

---

# Endpoints planejados

Autenticação:

```text
POST /auth/register
POST /auth/login
```

Produtos:

```text
GET /produtos
GET /produtos/{id}
POST /produtos
PUT /produtos/{id}
DELETE /produtos/{id}
```

Compras:

```text
POST /comprar
```

Pedidos:

```text
GET /pedido/{id}
GET /historico
```

Comentários:

```text
POST /comentarios
GET /produto/{id}/comentarios
```

Admin:

```text
GET /admin/lucro
```

---

# Regras do sistema

Usuário:

* Cadastro com nome, e-mail e CPF fictício
* Login via JWT
* Comprar produtos
* Acompanhar pedido
* Histórico de compras
* Avaliar produtos
* Comentar produtos comprados

Admin:

* Login administrativo
* Cadastro de produtos
* Visualização de lucro
* Controle de estoque

---

# Fluxo geral

```text
Front-end
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

---

# Membros do projeto

Adicionar integrantes do grupo aqui.

---

# Observações

Este documento poderá sofrer alterações durante o desenvolvimento do projeto.
