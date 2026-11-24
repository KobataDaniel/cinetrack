Integrantes:<br>
Daniel Kobata Barbosa     RA140453<br>
Gabriel Felipe Perissatto RA140640
Parte (1) 
Instruções para executar (que nós usamos):
- Baixe o projeto no Github
- Abra no VSCode
- Instale a extensão 'Live Server'
- Abra o index.html e aperte 'Go Live'
- O site será aberto em seu navegador<br>
Obs.: Essas são apenas as nossas recomendações. Use o ambiente e extensão de sua preferência.

Parte 2
Aplicação full-stack para gerenciamento de filmes, composta por frontend em React (Vite) e API REST em Node.js (Express) com persistência em arquivo JSON.
Estrutura do projeto
- `parte1/` — Versão inicial estática (tag `v1.0`)
- `frontend/` — Interface web em React com Vite (porta `5173`)
- `backend/` — API REST em Node.js com Express e banco em `data/filmes.json` (porta `3000`)
Como rodar o backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```
A API estará disponível em `http://localhost:3000`.

Como rodar o frontend
Com o backend em execução, abra outro terminal na raiz do projeto e rode:
```bash
cd frontend
npm install
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`.

Build de produção
```bash
cd frontend
npm run build
```
