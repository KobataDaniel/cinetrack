# Documentação da API REST — CineTrack (v2.0)

Base URL padrão em desenvolvimento: `http://localhost:3000`

Todas as requisições com corpo devem utilizar o cabeçalho `Content-Type: application/json`.

---

## Rotas de Filmes

### `GET /filmes`
Lista todos os filmes cadastrados, permitindo filtragem opcional por status e busca textual no título.

| Item | Detalhes |
| :--- | :--- |
| **Método** | `GET` |
| **Caminho** | `/filmes` |
| **Query Params** | `status` *(opcional)*: `assistido`, `assistindo` ou `quero`<br>`q` *(opcional)*: trecho do título (busca parcial case-insensitive) |
| **Corpo esperado** | Nenhum |
| **Respostas** | `200 OK`: Array JSON com os objetos de filmes correspondentes |

---

### `GET /filmes/:id`
Busca um filme específico pelo seu identificador numérico.

| Item | Detalhes |
| :--- | :--- |
| **Método** | `GET` |
| **Caminho** | `/filmes/:id` |
| **Parâmetros de rota** | `id` *(obrigatório)*: número inteiro identificador do filme |
| **Corpo esperado** | Nenhum |
| **Respostas** | `200 OK`: Objeto JSON do filme encontrado<br>`404 Not Found`: `{ "erro": "Filme não encontrado" }` |

---

### `POST /filmes`
Cadastra um novo filme na coleção e persiste no arquivo `backend/data/filmes.json`.

| Item | Detalhes |
| :--- | :--- |
| **Método** | `POST` |
| **Caminho** | `/filmes` |
| **Parâmetros** | Nenhum |
| **Corpo esperado** | `{ "titulo": string (obrigatório), "ano": number (1888–2030), "genero": string, "poster": string, "status": "assistido" \| "assistindo" \| "quero", "nota": number (1–5), "comentario": string }` |
| **Respostas** | `201 Created`: Objeto JSON do filme criado com `id` gerado<br>`400 Bad Request`: `{ "erros": ["título é obrigatório", "ano deve estar entre 1888 e 2030", "nota deve estar entre 1 e 5", "status deve ser assistido, assistindo ou quero"] }` |

---

### `PUT /filmes/:id`
Atualiza os dados de um filme existente.

| Item | Detalhes |
| :--- | :--- |
| **Método** | `PUT` |
| **Caminho** | `/filmes/:id` |
| **Parâmetros de rota** | `id` *(obrigatório)*: número inteiro identificador do filme |
| **Corpo esperado** | Campos a atualizar (`titulo`, `ano`, `genero`, `poster`, `status`, `nota`, `comentario`), sujeitos às mesmas regras de validação do `POST` |
| **Respostas** | `200 OK`: Objeto JSON do filme atualizado<br>`400 Bad Request`: `{ "erros": [...] }` quando algum campo resultante violar as regras de validação<br>`404 Not Found`: `{ "erro": "Filme não encontrado" }` |

---

### `DELETE /filmes/:id`
Remove um filme da coleção pelo seu identificador.

| Item | Detalhes |
| :--- | :--- |
| **Método** | `DELETE` |
| **Caminho** | `/filmes/:id` |
| **Parâmetros de rota** | `id` *(obrigatório)*: número inteiro identificador do filme |
| **Corpo esperado** | Nenhum |
| **Respostas** | `204 No Content`: Filme removido com sucesso (corpo vazio)<br>`404 Not Found`: `{ "erro": "Filme não encontrado" }` |

---

## Rotas de Estatísticas

### `GET /stats`
Retorna o resumo quantitativo da coleção de filmes cadastrados.

| Item | Detalhes |
| :--- | :--- |
| **Método** | `GET` |
| **Caminho** | `/stats` |
| **Parâmetros** | Nenhum |
| **Corpo esperado** | Nenhum |
| **Respostas** | `200 OK`: `{ "total": number, "porStatus": { "assistido": number, "assistindo": number, "quero": number }, "mediaNotas": number }` |