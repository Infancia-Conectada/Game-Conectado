# 🎮 Game Conectado - Icomon

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
