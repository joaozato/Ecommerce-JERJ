# 🛒 Ecommerce-JERJ

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Uma plataforma de e-commerce robusta, moderna e de alta interatividade, desenvolvida com foco em escalabilidade e experiência do usuário em tempo real. O projeto utiliza uma arquitetura desacoplada com um backend em **Spring Boot 4.0.6 (Java 17)** e um frontend SPA em **Angular 21**.

O grande diferencial deste projeto é o uso de **Server-Sent Events (SSE)** para atualizar dinamicamente o painel do administrador e fornecer rastreamento de entregas aos clientes sem a necessidade de requisições periódicas (polling).

---

## 🚀 Funcionalidades Principais

### 👤 Área do Cliente
* **Cadastro e Autenticação:** Registro seguro de novos usuários via endpoint dedicado e login controlado por tokens JWT.
* **Catálogo de Produtos:** Exibição dinâmica com busca avançada por nome, filtros automáticos por categoria e páginas de detalhes individuais.
* **Carrinho de Compras e Checkout:** Carrinho local reativo integrado com processo de checkout em várias etapas (Entrega, Pagamento via Cartão ou Pix com simulação de tempo limite de QR Code).
* **Histórico de Compras & Rastreamento em Tempo Real:** Listagem de compras anteriores na página de perfil com o status de entrega atualizado dinamicamente via **SSE (Server-Sent Events)** simulado pelo backend.

### 🔐 Área Administrativa
* **Dashboard em Tempo Real:** Exibição de métricas financeiras cruciais como Faturamento Total e Lucro Líquido do sistema, atualizados instantaneamente por SSE quando novas vendas ocorrem.
* **Gerenciamento de Inventário:** Ferramentas integradas para adicionar novos produtos (com imagem, preço, custo e estoque) e excluir itens obsoletos diretamente do painel administrativo.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 17** & **Spring Boot 4.0.6**
* **Spring Security** para controle de acesso stateless
* **Spring Data JPA** & **PostgreSQL** para persistência e modelagem relacional
* **Lombok** para otimização de classes modelo
* **JJWT (Java JWT - 0.12.6)** para geração e validação de tokens JWT
* **Spring ApplicationEvents** para propagar atualizações em tempo real no dashboard

### Frontend
* **Angular 21** (Framework SPA)
* **Tailwind CSS v4** para design responsivo e customizado
* **Lucide Angular** para pacote moderno de ícones de interface
* **RxJS** para comunicação assíncrona baseada em fluxos e manipulação de Server-Sent Events
* **Vitest** como test runner rápido e moderno para testes unitários

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
* Java JDK 17
* Maven 3.x
* Node.js & npm (v20+)
* PostgreSQL 16+

### 1. Configuração do Banco de Dados
Crie um banco de dados no PostgreSQL chamado `ecommercejerj`. 

O arquivo de configuração do backend [application.properties](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/backend/src/main/resources/application.properties) já está configurado com os seguintes padrões:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommercejerj
spring.datasource.username=postgres
spring.datasource.password=oceanpc10
```
*Caso suas credenciais locais do PostgreSQL sejam diferentes, edite esse arquivo antes de rodar o projeto.*

> [!NOTE]
> A estratégia `spring.jpa.hibernate.ddl-auto=update` está ativa. Isso significa que as tabelas necessárias (`produtos`, `usuarios`, `vendas`, `itens_venda`) serão geradas e atualizadas de forma 100% automática ao inicializar a API.

> [!TIP]
> O sistema possui uma configuração de semente (seeding) automática no arquivo [AdminUserConfig.java](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/backend/src/main/java/com/commerce/ecommercerj/infrastructure/config/AdminUserConfig.java). Ao ligar o backend pela primeira vez, ele cria automaticamente um usuário Administrador padrão para testes:
> * **E-mail:** `admin@admin.com`
> * **Senha:** `admin123`

### 2. Executando o Backend
Abra um terminal no diretório do backend e execute:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Executando o Frontend
Abra outro terminal no diretório do frontend, instale as dependências e inicie o servidor local:
```bash
cd frontend
npm install
npm start
```
O frontend estará disponível em `http://localhost:4200`.

---

## 🛣️ Estrutura da API (Endpoints)

| Método | Endpoint | Protegido por JWT? | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/auth/login` | Não | Autentica usuário e retorna JWT token |
| `POST` | `/usuarios/Cadastro` | Não | Registra um novo usuário no sistema |
| `GET` | `/usuarios/ListarTodos` | Não | Retorna a lista de todos os usuários |
| `DELETE` | `/usuarios/delete` | Não | Remove um usuário informando o parâmetro `?id=X` |
| `GET` | `/produtos/listarTodos` | Não | Lista todos os produtos cadastrados |
| `GET` | `/produtos/buscarID` | Não | Retorna detalhes do produto informando `?id=X` |
| `GET` | `/produtos/buscarNome` | Não | Pesquisa produtos informando o parâmetro `?nome=X` |
| `GET` | `/produtos/listarCategoria` | Não | Lista produtos por categoria usando `?categoria=X` |
| `POST` | `/produtos` | Não | Cadastra um novo produto |
| `DELETE` | `/produtos/delete` | Não | Remove um produto informando o parâmetro `?id=X` |
| `POST` | `/produtos/checkout` | **Sim** | Processa a compra dos itens enviados no corpo |
| `GET` | `/vendas/minhas-compras` | **Sim** | Recupera o histórico de compras do usuário logado |
| `GET` | `/admin/dashboard/stream` | Não (SSE) | Conexão SSE para fluxo de dados do dashboard em tempo real |
| `GET` | `/pedidos/{id}/tracking` | Não (SSE) | Conexão SSE para simulação do rastreio de pedido em tempo real |

---

## 🗺️ Mapa de Arquivos Importantes

Aqui estão links diretos para os arquivos estruturais e chaves de lógica no seu ambiente local:

* **Configuração de Segurança:** [SecurityConfig.java](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/backend/src/main/java/com/commerce/ecommercerj/security/SecurityConfig.java)
* **Geração de Tokens JWT:** [TokenService.java](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/backend/src/main/java/com/commerce/ecommercerj/security/TokenService.java)
* **Serviço de Negócio do Produto:** [produtosService.java](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/backend/src/main/java/com/commerce/ecommercerj/business/produtosService.java)
* **Fluxo SSE do Dashboard:** [AdminDashboardController.java](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/backend/src/main/java/com/commerce/ecommercerj/controller/AdminDashboardController.java)
* **Fluxo SSE de Entrega:** [PedidoTrackingController.java](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/backend/src/main/java/com/commerce/ecommercerj/controller/PedidoTrackingController.java)
* **Configuração de Rotas SPA:** [app.routes.ts](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/frontend/src/app/app.routes.ts)
* **Componente de Perfil e Rastreio:** [profile.component.ts](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/frontend/src/app/components/profile/profile.component.ts)
* **Configurações do Node/Angular:** [package.json](file:///C:/Users/Home-PC/IdeaProjects/Ecommerce-JERJ/frontend/package.json)

---

**Desenvolvedores:**
* José Filipe Marques (🔗 *https://github.com/JHOWSEF*)
* Eduardo Pires (🔗 *https://github.com/EOEDUZADA*)
* João Rodrigues (🔗 *https://github.com/joaozato*)
* Rafaela Nunes (🔗 *https://github.com/rfanunes*)

---

## 📝 Observações
Este projeto é um trabalho acadêmico/experimental completo. Sinta-se à vontade para explorar e testar a integração dinâmica em tempo real!

