# 🎮 DSList

API REST para gerenciamento de listas de jogos, desenvolvida com **Java 17** e **Spring Boot 3**. O projeto expõe endpoints para consultar jogos, listas e os jogos de cada lista, respeitando a ordem de posição definida em cada uma.

> Projeto desenvolvido durante o **Intensivão Java Spring**, da [DevSuperior](https://devsuperior.com.br), com o professor **Nélio Alves**.

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0.6-6DB33F?style=flat&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker&logoColor=white)
![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=flat&logo=railway&logoColor=white)

---

## 📌 Sobre o projeto

O DSList permite organizar jogos em listas temáticas (por exemplo, "Aventura e RPG" e "Jogos de plataforma"). Cada jogo pertence a uma ou mais listas e ocupa uma posição específica dentro delas, o que é modelado por uma entidade de associação com chave primária composta.

O projeto aborda, na prática:

- Arquitetura em camadas (controller, service, repository)
- Mapeamento objeto-relacional com JPA/Hibernate
- Relacionamento muitos-para-muitos com entidade de associação e chave composta
- Padrão DTO e projeções para consultas nativas
- Tratamento global de exceções
- Perfis de ambiente (teste, desenvolvimento e produção)
- Containerização do banco de dados com Docker
- Deploy em nuvem com Railway

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|---|---|
| Linguagem | Java 17 |
| Framework | Spring Boot 3.0.6 |
| Persistência | Spring Data JPA / Hibernate |
| Web | Spring Web (REST) |
| Banco de testes | H2 (em memória) |
| Banco de dev/produção | PostgreSQL |
| Build | Maven |
| Containers | Docker e Docker Compose |
| Deploy | Railway |

---

## 🗂️ Modelo de domínio

```
┌───────────────┐        ┌─────────────────────┐        ┌───────────────┐
│    Game       │ 1    * │     Belonging       │ *    1 │   GameList    │
│───────────────│────────│─────────────────────│────────│───────────────│
│ id            │        │ id (game + list)    │        │ id            │
│ title         │        │ position            │        │ name          │
│ year          │        └─────────────────────┘        └───────────────┘
│ genre         │
│ platforms     │
│ score         │
│ imgUrl        │
│ shortDescription │
│ longDescription  │
└───────────────┘
```

- **Game**: dados completos de um jogo.
- **GameList**: uma lista temática.
- **Belonging**: associação entre jogo e lista, com a posição do jogo na lista (chave composta `BelongingPK`).

---

## 🔌 Endpoints

| Método | Rota | Descrição | Retorno |
|---|---|---|---|
| `GET` | `/games` | Lista todos os jogos (dados resumidos) | `200` + lista de `GameMinDTO` |
| `GET` | `/games/{id}` | Busca um jogo pelo id (dados completos) | `200` + `GameDTO` ou `404` |
| `GET` | `/lists` | Lista todas as listas de jogos | `200` + lista de `GameListDTO` |
| `GET` | `/lists/{listId}/games` | Jogos de uma lista, ordenados por posição | `200` + lista de `GameMinDTO` |

### Exemplo de resposta: `GET /games/1`

```json
{
  "id": 1,
  "title": "Mass Effect Trilogy",
  "year": 2012,
  "genre": "Role-playing (RPG), Shooter",
  "platforms": "XBox, Playstation, PC",
  "score": 4.8,
  "imgUrl": "https://raw.githubusercontent.com/devsuperior/java-spring-dslist/main/resources/1.png",
  "shortDescription": "...",
  "longDescription": "..."
}
```

### Exemplo de erro: `GET /games/999`

```json
{
  "timestamp": "2026-10-11T02:00:00.000",
  "status": 404,
  "error": "Not Found",
  "message": "Jogo não encontrado",
  "path": "/games/999"
}
```

---

## ⚙️ Perfis de execução

O perfil ativo é definido pela variável de ambiente `APP_PROFILE` (padrão: `test`).

| Perfil | Banco | Uso |
|---|---|---|
| `test` | H2 em memória | Execução local rápida. O `import.sql` popula o banco automaticamente. Console em `/h2-console` |
| `dev` | PostgreSQL local (Docker) | Desenvolvimento com banco real |
| `prod` | PostgreSQL via variáveis de ambiente | Deploy (Railway) |

### Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `APP_PROFILE` | Perfil ativo | `test`, `dev` ou `prod` |
| `DB_URL` | URL JDBC do banco (perfil `prod`) | `jdbc:postgresql://host:5432/dslist` |
| `DB_USERNAME` | Usuário do banco (perfil `prod`) | `postgres` |
| `DB_PASSWORD` | Senha do banco (perfil `prod`) | — |
| `CORS_ORIGINS` | Origens permitidas | `http://localhost:5173,http://localhost:3000` |

> ⚠️ Nunca versione senhas ou URLs com credenciais. Use sempre variáveis de ambiente.

---

## 🚀 Como executar

### Pré-requisitos

- Java 17+
- Maven (ou o wrapper `./mvnw` do projeto)
- Docker e Docker Compose (apenas para o perfil `dev`)

### 1. Clonar o repositório

```bash
git clone https://github.com/obrenoxs/dslist.git
cd dslist
```

### 2. Executar com o perfil de teste (H2)

Não exige nenhuma configuração adicional:

```bash
./mvnw spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

### 3. Executar com PostgreSQL (perfil `dev`)

Suba o banco e o pgAdmin com Docker Compose:

```bash
cd docker
docker compose up -d
```

| Serviço | Porta | Credenciais |
|---|---|---|
| PostgreSQL | `5432` | usuário `postgres`, banco `dslist` |
| pgAdmin | `5050` | definidas no `docker-compose.yml` |

Com o perfil `dev`, o `ddl-auto` está como `none`, então é necessário criar as tabelas e popular o banco manualmente:

1. Gere o script de criação descomentando as propriedades `schema-generation` em `application-dev.properties` (ele gera o `create.sql` a partir das entidades). Depois comente-as novamente.
2. Execute o `create.sql` e, em seguida, o `import.sql` no banco (pelo pgAdmin ou `psql`).

Depois, execute a aplicação com o perfil ativo:

```bash
APP_PROFILE=dev ./mvnw spring-boot:run
```

> Se o Docker roda em uma máquina virtual, lembre de configurar o redirecionamento de portas e ajustar a porta na URL de conexão do `application-dev.properties`.

---

## ☁️ Deploy

A aplicação é publicada no [Railway](https://railway.app), com um banco PostgreSQL provisionado no próprio serviço.

Variáveis configuradas no serviço da API:

```
APP_PROFILE=prod
DB_URL=jdbc:postgresql://<host-interno>:5432/<banco>
DB_USERNAME=<usuario>
DB_PASSWORD=<senha>
```

A aplicação acessa o banco pela rede privada do Railway. Para popular o banco a partir da sua máquina, é necessário habilitar o acesso público temporariamente e desativá-lo em seguida.

---

## 📁 Estrutura do projeto

```
dslist
├── docker
│   └── docker-compose.yml
├── src/main
│   ├── java/com/devsuperior/dslist
│   │   ├── controllers      # GameController, GameListController
│   │   ├── dto              # GameDTO, GameMinDTO, GameListDTO
│   │   ├── entities         # Game, GameList, Belonging, BelongingPK
│   │   ├── projections      # GameMinProjection
│   │   ├── repositories     # GameRepository, GameListRepository
│   │   ├── services         # GameService, GameListService
│   │   │   └── exceptions   # ResourceNotFoundException
│   │   └── shared           # GlobalExceptionHandler
│   └── resources
│       ├── application.properties
│       ├── application-test.properties
│       ├── application-dev.properties
│       ├── application-prod.properties
│       └── import.sql
└── pom.xml
```

---

## 👨‍💻 Autor

**Breno Oliveira de Souza**

[![GitHub](https://img.shields.io/badge/GitHub-obrenoxs-181717?style=flat&logo=github&logoColor=white)](https://github.com/obrenoxs)
