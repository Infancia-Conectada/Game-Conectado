# Projeto MVC - Landing Page TechSolutions

Este é um projeto MVC (Model-View-Controller) desenvolvido com Node.js, Express e EJS, criando uma landing page moderna e responsiva para a empresa TechSolutions.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **EJS** - Template engine
- **CSS3** - Estilização moderna e responsiva
- **JavaScript** - Interatividade frontend
- **Nodemon** - Development tool para hot reload

## 📁 Estrutura do Projeto

```
repositorio-para-pi/
├── app.js                 # Servidor principal
├── package.json           # Dependências e scripts
├── README.md              # Documentação
└── src/                   # Código fonte da aplicação
    ├── controllers/       # Lógica de controle
    │   └── homeController.js  # Controller da página inicial
    ├── models/            # Modelos de dados
    │   └── dataModel.js   # Model com dados em variável
    ├── routes/            # Definições de rotas
    │   ├── index.js       # Centralizador de rotas
    │   ├── home.js        # Rotas da landing page
    │   └── api.js         # Rotas da API (futuro)
    ├── views/             # Templates EJS
    │   ├── index.ejs      # Landing page principal
    │   ├── about.ejs      # Página sobre a empresa
    │   ├── services.ejs   # Página de serviços detalhada
    │   ├── 404.ejs        # Página de erro 404
    │   └── error.ejs      # Página de erro genérica
    └── public/            # Arquivos estáticos
        ├── css/
        │   └── style.css  # Estilos principais
        └── js/
            └── script.js  # Scripts JavaScript
```

## 🏗️ Arquitetura MVC

### Model (`src/models/dataModel.js`)
- Gerencia dados da aplicação
- Simula dados de empresa, serviços, depoimentos e estatísticas
- Métodos para acessar diferentes conjuntos de dados
- **Sem banco de dados** - dados armazenados em variáveis

### View (`src/views/index.ejs`)
- Template EJS da landing page
- Layout responsivo e moderno
- Seções: Hero, Serviços, Sobre, Depoimentos, Contato
- Utiliza dados dinâmicos do model

### Controller (`src/controllers/homeController.js`)
- Processa requisições e respostas
- Integra model e view
- Tratamento de erros
- Métodos para diferentes páginas

### Routes (`src/routes/`)
- **index.js**: Centralizador de todas as rotas
- **home.js**: Rotas específicas da landing page
- **api.js**: Rotas de API (preparado para futuro)
- Organização modular e escalável

## 🎨 Características da Landing Page

### Páginas Disponíveis
- **Home** (`/`): Landing page principal com apresentação completa
- **About** (`/about`): Página detalhada sobre a empresa, equipe e valores  
- **Services** (`/services`): Página completa de serviços com preços e processos
- **Navegação integrada**: Menu funcional entre todas as páginas

### Design
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Moderno**: Interface limpa e profissional
- **Interativo**: Animações e efeitos hover
- **Acessível**: Boa estrutura semântica
- **Consistente**: Design uniforme em todas as páginas

### Seções
1. **Hero**: Apresentação principal com estatísticas
2. **Serviços**: Cards dos serviços oferecidos
3. **Sobre**: Informações da empresa
4. **Depoimentos**: Feedback de clientes
5. **Contato**: Formulário de contato
6. **Footer**: Informações adicionais

### Funcionalidades JavaScript
- Menu mobile responsivo
- Smooth scrolling
- Formulário de contato funcional
- Animações de entrada
- Notificações toast
- Contador animado
- Header dinâmico no scroll

## 🚦 Como Executar

### 1. Instalar Dependências
\`\`\`bash
npm install
\`\`\`

### 2. Executar em Desenvolvimento
\`\`\`bash
npm run dev
\`\`\`

### 4. Acessar a Aplicação
Abra o navegador e acesse: `http://localhost:3000`

## 📋 Scripts Disponíveis

- `npm run dev`: Executa com nodemon (hot reload)

## 🔧 Dependências

### Produção
- `express`: Framework web para Node.js
- `ejs`: Template engine
- `mysql2`: Driver MySQL (preparado para futuras implementações)

### Desenvolvimento
- `nodemon`: Reinicialização automática do servidor

## 📱 Responsividade

O projeto foi desenvolvido com abordagem mobile-first e inclui:

- **Breakpoints**: 768px (tablet) e 480px (mobile)
- **Menu hamburger**: Navegação mobile
- **Grid adaptável**: Layout flexível
- **Imagens responsivas**: Adaptação automática
- **Tipografia escalável**: Usando clamp() para textos

## 🎯 Recursos Implementados

### Frontend
- ✅ Design responsivo
- ✅ Animações CSS
- ✅ JavaScript interativo
- ✅ Formulário funcional
- ✅ Navigation smooth scroll
- ✅ Lazy loading de animações

### Backend
- ✅ Servidor Express configurado
- ✅ Middleware de segurança
- ✅ Tratamento de erros
- ✅ Arquivos estáticos
- ✅ Template engine EJS

### Estrutura
- ✅ Padrão MVC implementado
- ✅ Separação de responsabilidades
- ✅ Código limpo e documentado
- ✅ Estrutura escalável

## 🔮 Possíveis Expansões

1. **Banco de Dados**: Integrar MySQL para persistência
2. **Autenticação**: Sistema de login/cadastro
3. **CMS**: Painel administrativo
4. **Blog**: Seção de artigos
5. **E-commerce**: Loja virtual
6. **API**: Endpoints RESTful
7. **Testes**: Suíte de testes automatizados

## 👨‍💻 Desenvolvimento

Para modificar o projeto:

1. **Dados**: Edite `src/models/dataModel.js`
2. **Layout**: Modifique `src/views/index.ejs`
3. **Estilos**: Altere `src/public/css/style.css`
4. **Interações**: Edite `src/public/js/script.js`
5. **Lógica**: Modifique `src/controllers/homeController.js`
6. **Rotas**: Adicione novas rotas em `src/routes/`


**Desenvolvido com ❤️ por Kaique Covo.**