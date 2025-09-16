# Estrutura do Projeto MVC

```
repositorio-para-pi/
│
├── 📄 app.js                    # Servidor Express principal
├── 📄 package.json              # Dependências e configurações npm
├── 📄 package-lock.json         # Lock das dependências
├── 📄 README.md                 # Documentação do projeto
├── 📁 node_modules/             # Dependências instaladas
│
└── 📁 src/                      # 🎯 CÓDIGO FONTE PRINCIPAL
    │
    ├── 📁 controllers/          # 🎮 CAMADA DE CONTROLE
    │   └── 📄 homeController.js # Controller da landing page
    │
    ├── 📁 models/               # 📊 CAMADA DE DADOS
    │   └── 📄 dataModel.js      # Model com dados simulados
    │
    ├── 📁 routes/               # 🛣️ DEFINIÇÕES DE ROTAS
    │   ├── 📄 index.js          # Centralizador de rotas
    │   ├── 📄 home.js           # Rotas da landing page
    │   └── 📄 api.js            # Rotas da API (futuro)
    │
    ├── 📁 views/                # 👁️ CAMADA DE APRESENTAÇÃO
    │   ├── 📄 index.ejs         # Template da landing page
    │   ├── 📄 404.ejs           # Página de erro 404
    │   └── 📄 error.ejs         # Página de erro genérica
    │
    └── 📁 public/               # 🌐 ARQUIVOS ESTÁTICOS
        ├── 📁 css/
        │   └── 📄 style.css     # Estilos CSS principais
        └── 📁 js/
            └── 📄 script.js     # JavaScript do frontend
```

## 🏗️ Arquitetura MVC + Routes

### 🛣️ **Routes** (`src/routes/`)
- Definição e organização de rotas
- Separação por módulos/funcionalidades
- Centralização no index.js
- Facilita manutenção e escalabilidade

### 🎮 **Controller** (`src/controllers/`)
- Recebe requisições HTTP
- Processa lógica de negócio
- Interage com Models
- Renderiza Views
- Trata erros

### 📊 **Model** (`src/models/`)
- Gerencia dados da aplicação
- Simula banco de dados com variáveis
- Fornece métodos para acessar dados
- Validação de dados

### 👁️ **View** (`src/views/`)
- Templates EJS dinâmicos
- Apresentação dos dados
- Interface do usuário
- Layout responsivo

### 🌐 **Public** (`src/public/`)
- Arquivos estáticos (CSS, JS, imagens)
- Servidos diretamente pelo Express
- Estilos e interatividade frontend

## 🔄 Fluxo de Dados

```
1. 🌐 Requisição HTTP → app.js
2. 🛣️ app.js → Routes (roteamento)
3. 🎮 Routes → Controller
4. 📊 Controller → Model (busca dados)
5. 👁️ Controller → View (renderiza template)
6. 🌐 Response HTML → Cliente
```

## 🚀 Vantagens da Estrutura /src + Routes

- ✅ **Organização**: Código fonte separado da configuração
- ✅ **Escalabilidade**: Fácil adição de novos módulos e rotas
- ✅ **Manutenibilidade**: Estrutura clara e previsível
- ✅ **Padrões**: Seguindo boas práticas da indústria
- ✅ **Build**: Preparado para ferramentas de build
- ✅ **Deploy**: Facilita processo de deployment
- ✅ **Modularidade**: Rotas organizadas por funcionalidade
- ✅ **Separação de responsabilidades**: Cada camada com sua função