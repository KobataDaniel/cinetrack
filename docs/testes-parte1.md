# Relatório de Testes - Parte 1 (ANP 06)

Este documento registra a execução do roteiro de testes de mesa da aplicação CineTrack (Parte 1).

Legenda:
a) Caso de teste
b) Resultado esperado
c) Passou ou Falhou
d) Correção feita

1.
a)Adicionar um filme válido
b) O novo card deve aparecer imediatamente na interface sem recarregar a página e persistir no `localStorage`.
c) Passou
d) Nenhuma

2.
a) Enviar ano fora da faixa
b) A mensagem de erro deve ser exibida na interface (sem `alert`), impedindo o salvamento do filme
c) Passou
d) Nenhuma

3.
a) Editar um filme
b) As informações do card correto devem ser atualizadas sem duplicar o registro na lista
c) Passou
d) Nenhuma

4.
a) Remover e cancelar confirmação
b) Ao clicar em "Cancelar" na caixa de confirmação, o filme deve permanecer intacto na lista
c) Passou
d) Nenhuma

5.
a) Busca + Filtro de status combinados
b) Os dois filtros devem funcionar de forma conjunta (ex.: buscar "Origem" com o status "Assistido" ativo)
c) Passou
Nd) enhuma

6.
a) Recarregar a página
b) A lista com as últimas alterações (edições, adições, remoções) deve ser mantida ao pressionar F5
c) Passou
d) Nenhuma

7.
a) Tecla Esc e botão Cancelar no modal
b) Pressionar a tecla `Esc` ou clicar em `Cancelar` deve fechar a janela modal sem alterar os dados
c) Passou
d) Nenhuma

8.
a) Primeira visita (sem dados no storage)
b) Ao remover a chave `cinetrack:filmes` do `localStorage` e recarregar, os 6 filmes canônicos devem ser pré-carregados
c) Passou
d) Nenhuma