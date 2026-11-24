# Relatório de Testes Ponta a Ponta — Parte 2 (ANP 10 / Marco 2)

Este documento registra a execução dos testes de validação da API e do fluxo ponta a ponta (seed, backend, frontend, CRUD completo e persistência após reinicialização) do CineTrack v2.0.

Legenda:
a) Caso de teste / Passo executado
b) Resultado esperado
c) Resultado obtido / Status
d) Correção feita

1.
a) Inicialização limpa do banco JSON (`cd backend && node seed.js`)
b) O arquivo `backend/data/filmes.json` deve ser recriado com os 6 filmes canônicos iniciais.
c) Passou — arquivo gerado com 6 registros (IDs 1 a 6).
d) Nenhuma

2.
a) Inicialização do servidor backend (`cd backend && npm start` ou `node server.js`)
b) O servidor Express deve subir na porta `3000` sem erros de sintaxe ou dependência.
c) Passou — log `API na porta 3000` exibido no terminal.
d) Nenhuma

3.
a) Validação HTTP no `POST /filmes` com dados inválidos (`{ "titulo": "Teste", "ano": 2024, "nota": 7, "status": "inventado" }`)
b) A API deve rejeitar a requisição com status HTTP `400 Bad Request` e retornar todos os erros de uma vez no array `erros`.
c) Passou — retornou `400` com `{ "erros": ["nota deve estar entre 1 e 5", "status deve ser assistido, assistindo ou quero"] }`.
d) Implementada função `validarFilme` no `backend/server.js`.

4.
a) Validação HTTP no `PUT /filmes/1` com nota fora da faixa (`{ "nota": 0 }`)
b) A API deve aplicar a mesma validação do `POST`, retornando `400 Bad Request` sem corromper `filmes.json`.
c) Passou — retornou `400` com `{ "erros": ["nota deve estar entre 1 e 5"] }`.
d) Nenhuma

5.
a) Consulta de busca combinada (`GET /filmes?q=a&status=quero`) e estatísticas (`GET /stats`)
b) `/filmes?q=a&status=quero` deve retornar apenas `"Cidade de Deus"` e `/stats` deve retornar `total: 6`, `porStatus: { assistido: 3, assistindo: 1, quero: 2 }` e `mediaNotas: 4.5`.
c) Passou — respostas JSON exatas obtidas.
d) Nenhuma

6.
a) Inicialização do frontend React (`cd frontend && npm run dev`) e listagem inicial
b) A aplicação deve abrir em `http://localhost:5173`, consumir `GET /filmes` e exibir os 6 cards com o contador `"Exibindo 6 de 6 filmes"`.
c) Passou — lista carregada da API e contador atualizado.
d) Nenhuma

7.
a) CRUD completo pela interface web (Criar -> Filtrar/Buscar -> Editar -> Remover)
b) Criar um filme válido (`201 Created`) adiciona o card e atualiza o contador para 7; editar altera título/nota/status via `PUT`; remover exclui o registro via `DELETE` (`204 No Content`).
c) Passou — todas as operações refletidas imediatamente na interface e registradas no log do `morgan`.
d) Ajustado `frontend/src/api.js` e `ModalFilme.jsx` para exibir mensagens detalhadas da API em caso de erro `400`.

8.
a) Persistência após reinicialização do servidor backend
b) Encerrar o processo do Node (`Ctrl+C`), subir `node server.js` novamente e recarregar o frontend (`F5`): as alterações realizadas no passo 7 devem permanecer salvas.
c) Passou — os dados gravados em `backend/data/filmes.json` foram recarregados integralmente após reiniciar o servidor.
d) Nenhuma