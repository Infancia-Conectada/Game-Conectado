# Game Conectado 🎮

Um card game de batalha por turnos desenvolvido com Node.js, Express e MySQL.

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando
- Porta 3000 disponível

### Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
   - Execute o script SQL em `scripts/script.sql`
   - Configure as credenciais em `src/config/database.js`

4. Inicie o servidor:
```bash
npm run dev
```

5. Acesse no navegador:
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
Game-Conectado/
├── app.js                      # Servidor principal Express
├── package.json
├── scripts/
│   └── script.sql             # Script de criação do banco de dados
├── src/
│   ├── config/
│   │   └── database.js        # Configuração do MySQL
│   ├── controllers/
│   │   └── game.controller.js # Controlador do jogo
│   ├── models/
│   │   └── game.model.js      # Model de acesso aos dados
│   ├── routes/
│   │   ├── index.js           # Rotas principais
│   │   └── api.js             # Rotas da API REST
│   ├── views/
│   │   ├── game.ejs           # Template principal
│   │   └── 404.ejs            # Página de erro
│   └── public/
│       ├── js/
│       │   ├── gameEngine.js  # ⭐ Motor do jogo (lógica completa)
│       │   ├── jogo.js        # Interface do jogo
│       │   ├── menu.js        # Sistema de menu
│       │   ├── inventario.js  # Gerenciamento de inventário
│       │   ├── variables.js   # Variáveis globais
│       │   └── responsividade.js
│       ├── css/
│       │   ├── jogo.css       # Estilos do jogo e animações
│       │   ├── menu.css
│       │   ├── inventario.css
│       │   ├── modal.css
│       │   └── header-infancia.css
│       └── img/               # Imagens das cartas e cenários
```

## 🎯 Arquivos Principais Implementados

### 1. `gameEngine.js` - Motor do Jogo
Classe `GameEngine` que gerencia toda a lógica do jogo:
- ✅ Inicialização de decks (jogador, oponente, cenários)
- ✅ Sistema de turnos
- ✅ Cálculo de combate (dano, vida, vantagens elementares)
- ✅ Bônus de cenário
- ✅ Sistema de pontuação
- ✅ Detecção de vitória/derrota
- ✅ Reembaralhamento de cartas

### 2. `jogo.js` - Interface do Jogo
Conecta o motor do jogo com a interface:
- ✅ Modal de seleção de deck
- ✅ Integração com API para buscar dados do banco
- ✅ Exibição da mão do jogador
- ✅ Sistema de seleção de cartas
- ✅ Animações de batalha
- ✅ Tela de resultados
- ✅ Tela de fim de jogo

### 3. `api.js` - API REST
Endpoints para comunicação com o banco:
- `GET /api/deck/:deckId` - Busca cartas do deck

### 4. `jogo.css` - Estilos e Animações
- ✅ Animações de batalha
- ✅ Overlay de resultados
- ✅ Tela de fim de jogo
- ✅ Pontuação visual
- ✅ Efeitos visuais (pulso, fade, slide)

## 🎲 Regras do Jogo

Consulte o arquivo [COMO-JOGAR.md](COMO-JOGAR.md) para instruções detalhadas.

### Resumo
1. Cada jogador começa com 5 cartas
2. A cada turno, um cenário é revelado
3. Selecione 1 monstro (obrigatório) e 1 item (opcional)
4. Batalha: cartas são reveladas e danos calculados
5. Primeiro a fazer 3 pontos vence!

## 🧮 Sistema de Combate

### Cálculo de Dano
```javascript
Dano Final = Dano do Monstro 
           + Bônus do Item 
           + Bônus do Cenário 
           + Vantagem Elemental (+2 se tiver vantagem)
```

### Vantagens Elementares
- Água > Fogo
- Fogo > Terra
- Terra > Eletricidade
- Eletricidade > Água

### Tipos de Cartas
- **Monstros**: Possuem Vida, Dano e Elemento
  - Comum (Nível 2): 4 Vida, 2 Dano
  - Incomum (Nível 4): 6 Vida, 4 Dano
  - Raro (Nível 6): 8 Vida, 6 Dano

- **Itens**: Aumentam Dano ou Vida
  - Nível 1: +1
  - Nível 3: +2

- **Cenários**: Fornecem bônus para elementos específicos

## 🔧 Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **Banco de Dados**: MySQL2
- **Frontend**: JavaScript Vanilla, CSS3
- **Dev Tools**: Nodemon

## 🎨 Funcionalidades Implementadas

### ✅ Sistema de Jogo Completo
- [x] Seleção de deck do banco de dados
- [x] Inicialização do jogo com embaralhamento
- [x] Sistema de turnos automático
- [x] Combate com cálculos complexos
- [x] Vantagens elementares
- [x] Bônus de cenário
- [x] Sistema de pontuação
- [x] Detecção de fim de jogo
- [x] Reembaralhamento automático

### ✅ Interface
- [x] Modal de seleção de deck
- [x] Exibição da mão do jogador
- [x] Seleção visual de cartas
- [x] Animações de compra de cartas
- [x] Animações de batalha
- [x] Feedback visual de resultados
- [x] Placar em tempo real
- [x] Tela de vitória/derrota

### ✅ Integração com Banco de Dados
- [x] Carregamento de decks personalizados
- [x] Dados de monstros e itens
- [x] Sistema de inventário

## 🚧 Melhorias Futuras

- [ ] IA mais inteligente para o oponente
- [ ] Modo multiplayer online
- [ ] Sistema de amuletos
- [ ] Mais cenários e cartas
- [ ] Sistema de conquistas
- [ ] Loja de cartas
- [ ] Efeitos sonoros
- [ ] Animações mais elaboradas
- [ ] Tutorial interativo

## 🐛 Debug

Para ver os logs do jogo no console do navegador:
```javascript
// Abra o console (F12) e veja:
// - Estado do jogo
// - Cálculos de combate
// - Seleções de cartas
// - Resultados de turnos
```

## 📝 Notas de Desenvolvimento

### Arquitetura
- **MVC Pattern**: Model-View-Controller
- **API RESTful**: Comunicação assíncrona com o servidor
- **Game Engine**: Lógica isolada e reutilizável
- **Event-Driven**: Interface reativa baseada em eventos

### Decisões de Design
1. **Game Engine Separado**: Facilita manutenção e testes
2. **Dados no Banco**: Flexibilidade para adicionar conteúdo
3. **Animações CSS**: Performance superior ao JavaScript
4. **Estado Centralizado**: Um único objeto controla o jogo

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar documentação
- Otimizar código

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ para o projeto Infância Conectada**


<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-black?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![EJS](https://img.shields.io/badge/EJS-3.1.10-red?style=for-the-badge)

**Um jogo de cartas online baseado em elementos, onde estratégia e sorte se encontram!**

[📖 Documentação](#-estrutura-do-projeto) •
[🚀 Como Rodar](#-como-rodar-o-projeto) •
[🎯 Funcionalidades](#-funcionalidades) •
[🛠️ Tecnologias](#️-tecnologias-utilizadas)

</div>

---

## 📑 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Banco de Dados](#-banco-de-dados)
- [Arquitetura MVC](#️-arquitetura-mvc)
- [Rotas da API](#-rotas-da-api)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 📖 Sobre o Projeto

**Icomon** é um jogo de cartas online inspirado em jogos de estratégia baseados em elementos. Os jogadores constroem decks personalizados com monstros e itens elementais (Água, Fogo, Terra e Eletricidade), e batalham contra oponentes em diferentes cenários.

O projeto foi desenvolvido como parte do Projeto Integrador, utilizando o padrão de arquitetura **MVC (Model-View-Controller)** com Node.js, Express e MySQL.

### 🎯 Objetivo do Jogo

- Construa seu deck com até **20 cartas**
- Escolha entre **4 elementos**: Água, Fogo, Terra e Eletricidade
- Gerencie seu **inventário** de até 100 cartas
- Batalhe em **cenários elementais** que afetam o jogo
- Recicle cartas para ganhar **moedas**
- Acompanhe suas **estatísticas** e vitórias

---

## ✨ Funcionalidades

### 🎮 Sistema de Jogo

- ✅ **Menu Principal** com navegação interativa e tooltips
- ✅ **Seleção de Deck** com modal de confirmação
- ✅ **Sistema de Transição** com animação de portas entre telas
- ✅ **Batalhas por Turnos** com lógica de combate
- ✅ **Mecânica de Elementos** com vantagens e desvantagens

### 🎴 Sistema de Cartas

- ✅ **Inventário** com até 100 cartas
- ✅ **3 Decks Personalizáveis** (20 cartas cada)
- ✅ **Preview de Cartas** ao passar o mouse
- ✅ **Sistema de Raridade** (Comum, Incomum, Raro)
- ✅ **Tipos de Cartas**: Monstros e Itens
- ✅ **Reciclagem de Cartas** para ganhar moedas

### 👤 Sistema de Usuário

- ✅ **Perfil do Jogador** com apelido e avatar
- ✅ **Sistema de Moedas** para compras
- ✅ **Estatísticas** (batalhas, vitórias)
- ✅ **Personalização** de avatar

### 🎨 Interface

- ✅ **Design Responsivo** e intuitivo
- ✅ **Animações Suaves** entre telas
- ✅ **Efeitos Visuais** em hover e cliques
- ✅ **Modais Interativos** para confirmações
- ✅ **Sistema de Scroll** para inventário

---

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | 18.x+ | Ambiente de execução JavaScript |
| **Express** | 5.1.0 | Framework web minimalista |
| **MySQL2** | 3.15.3 | Driver MySQL com suporte a Promises |
| **EJS** | 3.1.10 | Template engine para renderização |

### Frontend

| Tecnologia | Descrição |
|-----------|-----------|
| **HTML5** | Estrutura semântica |
| **CSS3** | Estilização e animações |
| **JavaScript (ES6+)** | Lógica do cliente |

### Ferramentas de Desenvolvimento

| Ferramenta | Versão | Descrição |
|-----------|--------|-----------|
| **Nodemon** | 3.1.10 | Auto-reload do servidor |
| **Git** | - | Controle de versão |

---

## 📁 Estrutura do Projeto

```
Game-Conectado/
│
├── 📄 app.js                           # Servidor Express principal
├── 📄 package.json                     # Dependências e scripts
├── 📄 README.md                        # Documentação (este arquivo)
├── 📄 ESTRUTURA.md                     # Documentação da arquitetura
│
├── 📁 scripts/                         # Scripts SQL
│   └── 📄 script.sql                   # Criação de tabelas e dados iniciais
│
└── 📁 src/                             # Código fonte principal
    │
    ├── 📁 config/                      # Configurações
    │   └── 📄 database.js              # Configuração MySQL
    │
    ├── 📁 controllers/                 # Lógica de controle
    │   └── 📄 game.controller.js       # Controller do jogo
    │
    ├── 📁 models/                      # Modelos de dados
    │   └── 📄 game.model.js            # Model do jogo
    │
    ├── 📁 routes/                      # Definição de rotas
    │   ├── 📄 index.js                 # Centralizador de rotas
    │   └── 📄 api.js                   # Rotas da API
    │
    ├── 📁 views/                       # Templates EJS
    │   ├── 📄 game.ejs                 # Tela principal do jogo
    │   └── 📄 404.ejs                  # Página de erro 404
    │
    └── 📁 public/                      # Arquivos estáticos
        │
        ├── 📁 css/                     # Estilos
        │   ├── 📄 header-infancia.css  # Header do projeto
        │   ├── 📄 inventario.css       # Estilos do inventário
        │   ├── 📄 jogo.css             # Estilos do jogo
        │   ├── 📄 menu.css             # Estilos do menu
        │   └── 📄 modal.css            # Estilos dos modais
        │
        ├── 📁 js/                      # Scripts JavaScript
        │   ├── 📄 header-infancia.js   # Lógica do header
        │   ├── 📄 inventario.js        # Lógica do inventário
        │   ├── 📄 jogo.js              # Lógica do jogo
        │   ├── 📄 menu.js              # Lógica do menu
        │   └── 📄 variables.js         # Variáveis globais
        │
        └── 📁 img/                     # Imagens do jogo
            ├── 📁 amuletos/            # Sprites de amuletos
            ├── 📁 background/          # Backgrounds e cenários
            ├── 📁 cenarios/            # Imagens de cenários
            ├── 📁 icones/              # Ícones das cartas
            ├── 📁 inputs/              # Assets de UI
            ├── 📁 itens/               # Sprites de itens
            ├── 📁 monstros/            # Sprites de monstros
            └── 📁 transicao/           # Animações de transição
```

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.x ou superior)
  - [Download Node.js](https://nodejs.org/)
  
- **MySQL** (versão 8.0 ou superior)
  - [Download MySQL](https://dev.mysql.com/downloads/)
  
- **Git** (opcional, para clonar o repositório)
  - [Download Git](https://git-scm.com/)

### Verificar Instalações

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar MySQL
mysql --version
```

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/Infancia-Conectada/Game-Conectado.git
cd Game-Conectado
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

### 3️⃣ Configure o Banco de Dados

#### a) Criar o Banco de Dados

```bash
# Acesse o MySQL
mysql -u root -p

# Crie o banco de dados
CREATE DATABASE icomon;
exit;
```

#### b) Execute o Script SQL

```bash
# Importe o script de criação
mysql -u root -p icomon < scripts/script.sql
```

**Ou**, execute manualmente o arquivo `scripts/script.sql` no MySQL Workbench ou phpMyAdmin.

### 4️⃣ Configure a Conexão com o Banco

Edite o arquivo `src/config/database.js` com suas credenciais:

```javascript
const conexao = mysql.createPool({
    host: "localhost",
    user: "root",              // Seu usuário MySQL
    password: "root",          // Sua senha MySQL
    database: "icomon"         // Nome do banco
});
```

### 5️⃣ Inicie o Servidor

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Ou modo normal
node app.js
```

### 6️⃣ Acesse no Navegador

Abra seu navegador e acesse:

```
http://localhost:3000
```

🎉 **Pronto! O jogo está rodando!**

---

## 🗄️ Banco de Dados

### Modelo de Dados

O banco de dados **icomon** possui as seguintes tabelas:

#### 👤 `perfil_usuario`
Armazena informações do jogador
- `id` - ID único do usuário
- `apelido` - Nome do jogador (padrão: "Pequeno Gafanhoto")
- `moedas` - Quantidade de moedas
- `qtd_batalhas` - Total de batalhas
- `qtd_vitorias` - Total de vitórias
- `img_avatar` - URL da imagem do avatar

#### 🎴 `todas_cartas`
Catálogo completo de cartas disponíveis
- `id` - ID único da carta
- `nome` - Nome da carta
- `tipo` - `monstro` ou `item`
- `raridade` - `comum`, `incomum` ou `raro`
- `elemento` - `agua`, `fogo`, `terra`, `eletricidade`
- `img_url` - URL da imagem da carta
- `ico_url` - URL do ícone da carta

#### 🌍 `deck_cenarios`
Cenários disponíveis para batalha
- `id` - ID único do cenário
- `nome` - Nome do cenário
- `elemento1` - Primeiro elemento do cenário
- `elemento2` - Segundo elemento (opcional)
- `img_url` - URL da imagem do cenário

#### 📦 `inventarios`
Inventário individual de cada jogador (max 100 cartas)
- `id` - ID único
- `id_usuario` - Referência ao usuário
- `id_carta` - Referência à carta

#### 🎯 `decks`
Decks criados pelo jogador (3 decks)
- `id` - ID único do deck
- `id_inventario` - Referência ao inventário
- `ativo` - Se o deck está ativo

#### 🃏 `decks_individuais`
Cartas de cada deck (20 cartas por deck)
- `id` - ID único
- `id_carta` - Referência à carta
- `id_deck` - Referência ao deck

### Elementos e Vantagens

| Elemento | Forte Contra | Fraco Contra |
|----------|-------------|--------------|
| 🔵 Água | 🔥 Fogo | ⚡ Eletricidade |
| 🔥 Fogo | 🌱 Terra | 🔵 Água |
| 🌱 Terra | ⚡ Eletricidade | 🔥 Fogo |
| ⚡ Eletricidade | 🔵 Água | 🌱 Terra |

---

## 🏗️ Arquitetura MVC

O projeto segue o padrão **MVC (Model-View-Controller)** com separação de responsabilidades:

### 🎮 Controller (`src/controllers/`)

Responsável por:
- Receber requisições HTTP
- Processar lógica de negócio
- Interagir com Models
- Renderizar Views
- Tratar erros

**Exemplo:**
```javascript
// game.controller.js
async function getGame(req, res) {
    const cards = await gameModel.getAllCards();
    res.render('game', { cards });
}
```

### 📊 Model (`src/models/`)

Responsável por:
- Gerenciar dados da aplicação
- Comunicação com banco de dados
- Validação de dados
- Lógica de acesso aos dados

**Exemplo:**
```javascript
// game.model.js
async function getAllCards() {
    const [rows] = await conexao.query('SELECT * FROM todas_cartas');
    return rows;
}
```

### 👁️ View (`src/views/`)

Responsável por:
- Templates EJS dinâmicos
- Apresentação dos dados
- Interface do usuário
- HTML renderizado

**Exemplo:**
```ejs
<!-- game.ejs -->
<% cards.forEach(card => { %>
    <div class="card"><%= card.nome %></div>
<% }); %>
```

### 🛣️ Routes (`src/routes/`)

Responsável por:
- Definição de rotas
- Mapeamento URL → Controller
- Organização modular

**Exemplo:**
```javascript
// api.js
router.get('/game', gameController.getGame);
```

### 🔄 Fluxo de Dados

```
Cliente (Navegador)
    ↓ HTTP Request
app.js (Express)
    ↓ Roteamento
Routes (src/routes/)
    ↓ Chamada
Controller (src/controllers/)
    ↓ Busca dados
Model (src/models/)
    ↓ Query SQL
MySQL Database
    ↓ Retorno
Model → Controller → View
    ↓ HTML Renderizado
Cliente (Navegador)
```

---

## 🌐 Rotas da API

### Rotas Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Página principal do jogo |
| `GET` | `/api/cards` | Lista todas as cartas |
| `GET` | `/api/inventory/:userId` | Inventário do usuário |
| `GET` | `/api/decks/:userId` | Decks do usuário |
| `GET` | `/api/scenarios` | Lista todos os cenários |

### Exemplos de Uso

```javascript
// Buscar todas as cartas
fetch('/api/cards')
    .then(res => res.json())
    .then(cards => console.log(cards));

// Buscar inventário do usuário
fetch('/api/inventory/1')
    .then(res => res.json())
    .then(inventory => console.log(inventory));
```

---

## 🎨 Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Inicia o servidor em modo desenvolvimento com **auto-reload**.
O servidor reinicia automaticamente quando você faz alterações no código.

```bash
npm run dev
```

### `node app.js`

Inicia o servidor em modo produção.

```bash
node app.js
```

---

## 🎯 Funcionalidades Futuras

- [ ] Sistema de Loja para comprar cartas
- [ ] Multiplayer online em tempo real
- [ ] Chat entre jogadores
- [ ] Ranking global de jogadores
- [ ] Modo Tutorial interativo
- [ ] Mais cenários e elementos
- [ ] Sistema de conquistas/achievements
- [ ] Baús de recompensa diários
- [ ] Torneios e eventos especiais

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido como parte do **Projeto Integrador** da Infância Conectada.

---

## 👥 Equipe

Desenvolvido por **Infância Conectada**

---

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [seção de Issues](https://github.com/Infancia-Conectada/Game-Conectado/issues)
2. Abra uma nova Issue descrevendo o problema
3. Entre em contato com a equipe

---

<div align="center">

**⭐ Se você gostou do projeto, deixe uma estrela! ⭐**

Made with ❤️ by Infância Conectada

</div>
