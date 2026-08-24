Tecnologias
    HTML5 · CSS3 · JavaScript (ES6+) · DOM API · persistência local no navegador

Requisitos Funcionais
    RF-01: Lista de filmes em cards
    A página principal deve exibir os filmes cadastrados em uma grade responsiva de cards, gerada dinamicamente
    pelo JavaScript a partir dos dados em memória. Cada card deve apresentar:
    • Imagem do pôster, com texto alternativo descritivo (usar a URL fornecida ou uma imagem de placeholder
    quando ausente);
    • Título do filme em destaque;
    • Ano de lançamento e gênero;
    • Nota visual em estrelas (sempre 5 símbolos: cheios e vazios);
    • Indicação visual do status (badge colorida distinta para cada status);
    • Botões de editar e remover.

    RF-02: Busca por título
    Um campo de busca deve filtrar os cards exibidos de acordo com o que o usuário digita. A busca deve ser
    case-insensitive e reagir enquanto o usuário digita, atualizando a lista sem recarregar a página. Recomenda-se
    aplicar a técnica de debounce para evitar re-renderizações a cada tecla.

    RF-03: Filtro por status
    A interface deve oferecer botões que filtram a visualização por status (Todos, Assistido, Assistindo e Quero assistir).
    O botão ativo deve ter destaque visual e a opção Todos começa selecionada. O filtro de status deve funcionar em
    conjunto com a busca por título: os dois critérios se combinam.

    RF-04: Cadastro de filme
    A aplicação deve oferecer um formulário para adicionar filmes, com validação nativa do HTML. O formulário deve
    conter os seguintes campos, cada um com rótulo (<label>) associado:
    • Título (texto, obrigatório);
    • Ano (número, obrigatório, com faixa de valores válida);
    • Gênero (texto, obrigatório);
    • URL do pôster (texto, opcional);
    • Status (seleção com as três opções, obrigatório);
    • Nota (número de 1 a 5, obrigatório);
    • Comentário (texto longo, opcional).
    O acionamento do cadastro deve abrir o formulário limpo. Se o formulário for apresentado em uma janela
    sobreposta (modal), ela deve poder ser fechada tanto por um botão de cancelar quanto pela tecla Esc.

    RF-05: Validação do formulário com JavaScript
    No envio do formulário, os dados devem ser validados por JavaScript antes de serem salvos. Em caso de erro,
    as mensagens devem ser exibidas na interface (não usar alert()) e o filme não é salvo. Os campos numéricos
    devem ser tratados como números.

    RF-06: Edição de filme
    Ao acionar Editar em um card, o formulário deve ser reaproveitado, pré-preenchido com os dados do filme
    selecionado. Ao confirmar, o filme correspondente é atualizado e a lista é re-renderizada.

    RF-07: Remoção de filme
    Ao acionar Remover, o usuário deve confirmar a ação antes de o filme ser excluído. Após a confirmação, o filme
    sai da lista e a exibição é atualizada. Os botões dos cards devem continuar funcionando.

    RF-08: Persistência local
    A lista de filmes deve ser persistida localmente no navegador, de modo que seja carregada ao abrir a página e
    regravada após cada adição, edição ou remoção. Recarregar a página não pode perder dados.

    RF-09: Dados iniciais pré-carregados
    Na primeira visita (sem dados salvos), a aplicação deve carregar os 6 filmes de exemplo da Seção 5. Cada novo
    filme adicionado deve receber um identificador único

Requisitos Não Funcionais
    • Layout responsivo: a página deve ser utilizável de 320 px (celular) a 1920 px (desktop). A grade de cards
    deve usar CSS Grid; o cabeçalho e os filtros podem usar flexbox; media queries ajustam os breakpoints.

    • Tema com variáveis CSS: cores e raios centralizados em variáveis CSS; recomenda-se dark mode automático
    via prefers-color-scheme.

    • Acessibilidade: rótulos em todos os campos, texto alternativo nas imagens e uso adequado de atributos
    ARIA na busca e na navegação. A aplicação deve ter boa pontuação de acessibilidade.

    • Sem frameworks JS: não é permitido jQuery, React ou qualquer outra biblioteca JavaScript nesta parte.
    Apenas JavaScript puro (ES6+).

    • Organização do código: HTML, CSS e JavaScript em arquivos separados.

    • Compatibilidade: a aplicação deve funcionar nos navegadores modernos (Chrome, Firefox, Edge, versões
    recentes).