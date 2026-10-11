# DSList Frontend

Front-end do DSList, API REST de listas de jogos (Java/Spring Boot).

## Stack
React + Vite + TypeScript, Tailwind CSS, Framer Motion, dnd-kit (drag and drop)

## API (variável VITE_API_URL)
- GET /games, GET /games/{id}
- GET /lists, GET /lists/{listId}/games
- POST /lists/{listId}/replacement  body: { "sourceIndex": 0, "destinationIndex": 2 }

## Regras
- Interface em português, visual moderno, tema escuro, animações suaves
- Código em TypeScript, componentes pequenos, sem bibliotecas desnecessárias
- Explique brevemente cada decisão de arquitetura

## Formato das respostas da API
- GET /lists → [{ id, name }]
- GET /lists/{listId}/games e GET /games → [{ id, title, year, imgUrl, shortDescription }]
- GET /games/{id} → { id, title, year, genre, platforms, score, imgUrl, shortDescription, longDescription }
- Erro 404 → { timestamp, status, error, message, path }

## Ambiente
- A URL da API fica na variável VITE_API_URL (arquivo .env.local, nunca versionado)
- Produção (Railway): https://dslist-production-8e3d.up.railway.app
- Local: http://localhost:8080 (perfil test, com H2)