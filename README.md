# API de Catálogo de Receitas - Desafio Biox

Esta é uma API de catálogo de receitas desenvolvida como parte de um teste prático, com foco na aplicação de princípios de Clean Architecture e Domain-Driven Design (DDD) utilizando Node.js e NestJS.

## Objetivo

A API permite:
* Criar uma nova receita. 
* Listar todas as receitas. 
* Buscar uma receita específica pelo seu ID.

## Requisitos Técnicos

* Node.js
* NestJS
* TypeScript
* Clean Architecture (separação de camadas, use-cases, presenters)
* Repositório em memória (para este desafio)

## Como Rodar a Aplicação

### Pré-requisitos

* Node.js (versão 16.x ou superior recomendada)
* npm ou yarn

### Passos

1.  **Clone o repositório** (se aplicável, caso esteja em um git):
    ```bash
    # git clone https://github.com/jaobarreto/desafio-biox.git
    # cd api-catalogo-receitas
    ```

2.  **Instale as dependências**:
    Com npm:
    ```bash
    npm install
    ```
    Ou com yarn:
    ```bash
    yarn install
    ```

3.  **Rode a aplicação em modo de desenvolvimento**:
    Com npm:
    ```bash
    npm run start:dev
    ```
    Ou com yarn:
    ```bash
    yarn start:dev
    ```
    A aplicação estará disponível em `http://localhost:3000`.

## Endpoints da API

A URL base da API é `http://localhost:3000`.

### 1. Criar uma Nova Receita

* **Método**: `POST`
* **Endpoint**: `/recipes`
* **Descrição**: Cria uma nova receita no catálogo.
* **Corpo da Requisição** (JSON):
    ```json
    {
      "title": "Bolo de Chocolate",
      "description": "Um delicioso bolo de chocolate fofinho.",
      "ingredients": ["Farinha de trigo", "Açúcar", "Chocolate em pó", "Ovos", "Leite", "Fermento"]
    }
    ```
* **Resposta de Sucesso** (`201 Created`):
    ```json
    {
      "id": "gerado-automaticamente-uuid",
      "title": "Bolo de Chocolate",
      "ingredients": ["Farinha de trigo", "Açúcar", "Chocolate em pó", "Ovos", "Leite", "Fermento"],
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
    ```
* **Respostas de Erro**:
    * `400 Bad Request`: Se os dados enviados no corpo da requisição forem inválidos (ex: campos faltando, tipos incorretos).

### 2. Listar Todas as Receitas

* **Método**: `GET`
* **Endpoint**: `/recipes`
* **Descrição**: Retorna uma lista de todas as receitas cadastradas.
* **Resposta de Sucesso** (`200 OK`):
    ```json
    [
      {
        "id": "123",
        "title": "Bolo de cenoura",
        "ingredients": ["cenoura", "açúcar", "farinha"],
        "createdAt": "2024-01-01T12:00:00.000Z"
      },
      {
        "id": "456",
        "title": "Mousse de Maracujá",
        "ingredients": ["Maracujá", "Leite condensado", "Creme de leite"],
        "createdAt": "2024-01-02T15:30:00.000Z"
      }
    ]
    ```
    _O exemplo acima é ilustrativo. O formato exato dos dados retornados pode variar._

### 3. Buscar Receita por ID

* **Método**: `GET`
* **Endpoint**: `/recipes/:id`
* **Descrição**: Busca e retorna uma receita específica com base no seu ID.
* **Parâmetro de Rota**:
    * `id` (string): O ID da receita a ser buscada.
* **Resposta de Sucesso** (`200 OK`):
    ```json
    {
      "id": "123",
      "title": "Bolo de cenoura",
      "ingredients": ["cenoura", "açúcar", "farinha"],
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
    ```
* **Respostas de Erro**:
    * `404 Not Found`: Se nenhuma receita com o ID fornecido for encontrada.

## Estrutura do Projeto (Clean Architecture)

O projeto segue os princípios da Clean Architecture, dividindo as responsabilidades em camadas:

* **Domain**: Contém as entidades de negócio (`Recipe`) e as interfaces dos repositórios (`RecipeRepository`). É o núcleo da aplicação.
* **Application**: Orquestra os fluxos de dados com os Casos de Uso (`CreateRecipeUseCase`, `ListAllRecipesUseCase`, `GetRecipeByIdUseCase`) e os Presenters (`RecipePresenter`) que formatam os dados para a saída.
* **Infrastructure**: Contém as implementações concretas, como o repositório em memória (`InMemoryRecipeRepository`) e os DTOs de requisição HTTP (`CreateRecipeRequestDto`).
* **Presentation**: Camada mais externa, responsável pela interação HTTP, representada pelo `RecipesController` no NestJS.

## Tecnologias Utilizadas

* Node.js
* NestJS Framework
* TypeScript
* UUID (para geração de IDs únicos)
* class-validator (para validação de DTOs)

---
