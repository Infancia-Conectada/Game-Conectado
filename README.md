Projeto ICOMON, jogo de cartas digital, feito em parceiria com Jogo Interativo e Infancia Conectada.

## 🚀 Tecnologias Utilizadas: **Node.js**, **Express.js**, **EJS**, **CSS3**, **JavaScript**, **Nodemon**, **MySQL**

## 📁 Estrutura do Projeto

```
Game-Conectado/
├── app.js                     # Servidor principal
├── package.json               # Dependências e scripts
├── README.md                  # Documentação
└── src/                       # Código fonte da aplicação
    ├── controllers/           # Lógica de controle
    │   └── homeController.js  # Controller da página inicial
    ├── models/                # Modelos de dados
    │   └── dataModel.js       # Model com dados em variável
    ├── routes/                # Definições de rotas
    │   ├── index.js           # Centralizador de rotas
    │   ├── home.js            # Rotas da landing page
    │   └── api.js             # Rotas da API (futuro)
    ├── views/                 # Templates EJS
    │   ├── game.ejs           # Landing page principal
    │   ├── 404.ejs            # Página de erro 404
    │   └── error.ejs          # Página de erro genérica
    ├── img/                   # Banco de imagens
    └── public/                # Arquivos estáticos
        ├── css/
        │   └── style.css      # Estilos principais
        └── js/
            └── script.js      # Scripts JavaScript

## 🚦 Como Executar

### 1. Instalar Dependências
npm install

### 2. Executar em Desenvolvimento
npm run dev

### 4. Acessar a Aplicação
Abra o navegador e acesse: `http://localhost:3000`

## 📋 Scripts Disponíveis

npm run dev
Executa com nodemon (hot reload)

## 🔧 Dependências

### Produção
- `express`: Framework web para Node.js
- `ejs`: Template engine
- `mysql2`: Driver MySQL (preparado para futuras implementações)

### Desenvolvimento
- `nodemon`: Reinicialização automática do servidor

## Equipe SENAC 2025

Lucas Mendes, Giovana Silva, Matheus Santana e Rafael Cesar

**Acompanhados com ❤️ por Kaique Covo.**
