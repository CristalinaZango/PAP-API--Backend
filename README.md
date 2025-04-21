# API Node.js com PostgreSQL

## 📌 Descrição
Projeto de API REST para gerenciamento de empresas, serviços, logs e usuários com autenticação via JWT. A API permite operações CRUD em entidades como empresas, serviços e usuários, além de registrar logs de ações realizadas.

## 🚀 Tecnologias
- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- JWT para autenticação
- Multer para upload de arquivos

## 📂 Estrutura do Projeto
/src 
  ├── app.js # Configuração principal do Express 
  ├── server.js # Inicialização do servidor 
  ├── config/ # Configurações do banco de dados 
   │ 
   └── database.js # Configuração do Sequelize 
  ├── controllers/ # Lógica de controle das rotas 
   │
   ├── authController.js 
   │ 
   ├── companyController.js 
   │ 
   ├── logController.js 
   │ 
   ├── serviceController.js 
   │ 
   └── userController.js 
  ├── middlewares/ # Middlewares da aplicação 
   │ 
   └── auth.js # Middleware de autenticação JWT 
  ├── migrations/ # Arquivos de migração do banco de dados 
   │ 
   ├── config/ # Configuração do banco para migrações 
   │ 
   ├── migrations/ # Scripts de migração 
   │ 
   └── models/ # Modelos para migrações 
  ├── models/ # Modelos do banco de dados 
   │ 
   ├── Company.js 
   │ 
   ├── Log.js 
   │ 
   ├── Service.js 
   │ 
   ├── User.js 
   │ 
   └── index.js # Exporta todos os modelos 
  ├── routes/ # Rotas da API 
   │ 
   └── index.js # Arquivo principal de rotas 
  ├── scripts/ # Scripts utilitários 
   │ 
   └── seedAdmin.js # Script para criar um usuário admin 
  ├── utils/ # Utilitários da aplicação 
   │ 
   └── logHelper.js # Função para criar logs 
  └── uploads/ # Diretório para uploads de arquivos

## ⚙️ Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>

2. Instale as dependências:

npm install

3. Configure o banco de dados no arquivo .env:

- DB_USER=postgres
- DB_HOST=localhost
- DB_NAME=pap_deuma
- DB_PASSWORD=1234567890
- DB_PORT=5432
- JWT_SECRET=kjahSDKUHA8726wydgAHSYGFYgashdGH==12312
- JWT_EXPIRATION=1h

4. Execute as migrações para criar as tabelas no banco de dados:

npx sequelize-cli db:migrate

5. Inicie o servidor:

npm run dev

## 🛠️ Endpoints

## Rotas Principais

## Autenticação

- POST /api/login: Login de usuários.

## User
- GET /api/users: Listar todos os usuários.
- POST /api/users: Criar um novo usuário.
- PUT /api/users/:id: Atualizar um usuário.
- DELETE /api/users/:id: Remover um usuário.
Empresas

## Empresas
- GET /api/companies: Listar todas as empresas.
- POST /api/companies: Criar uma nova empresa.
- PUT /api/companies/:id: Atualizar uma empresa.
- DELETE /api/companies/:id: Remover uma empresa.
Serviços

## Serviços
- GET /api/services: Listar todos os serviços.
- POST /api/services: Criar um novo serviço.
- PUT /api/services/:id: Atualizar um serviço.
- DELETE /api/services/:id: Remover um serviço.
Logs

## Logs
- GET /api/logs: Listar todos os logs.
- GET /api/logs/:id: Buscar log por ID.

## Tecnologias Utilizadas
- Node.js: Ambiente de execução JavaScript.
- Express: Framework para construção de APIs.
- Sequelize: ORM para interação com o banco de dados.
- PostgreSQL: Banco de dados relacional.
- Multer: Middleware para upload de arquivos.
- JWT: Autenticação baseada em tokens.

## 🔒 Autenticação
O sistema utiliza JWT para autenticação. Para acessar rotas protegidas, inclua o token no header da requisição:

Authorization: Bearer <seu-token-jwt/>


- npm run dev: Inicia o servidor em modo de desenvolvimento com nodemon.
- npm start: Inicia o servidor em modo de produção.
- npx sequelize-cli db:migrate: Executa as migrações do banco de dados.



