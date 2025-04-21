# API Node.js com PostgreSQL

## 📌 Descrição
Projeto de API REST para gerenciamento de empresas, serviços, documentos e usuários com autenticação via JWT.

## 🚀 Tecnologias
- Node.js
- Express.js
- PostgreSQL
- JWT para autenticação

## 📂 Estrutura do Projeto
/projeto │-- /config # Configuração do banco de dados │-- /models # Modelos do banco de dados │-- /controllers # Lógica de controle das rotas │-- /routes # Rotas da API │-- /middleware # Middleware de autenticação │-- .env # Variáveis de ambiente │-- app.js # Configuração principal do Express │-- server.js # Inicialização do servidor │-- README.md # Documentação do projeto

## ⚙️ Instalação
1. Clone o repositório:
2. Instale as dependências:
3. Configure o banco de dados no arquivo `.env`
4. Inicie o servidor:

## 🛠️ Endpoints
| Método | Rota           | Descrição |
|--------|---------------|-----------|
| GET    | /empresas     | Lista todas as empresas |
| GET    | /servicos     | Lista todos os serviços |
| GET    | /documentos   | Lista todos os documentos |
| POST   | /admin/login  | Autenticação de usuário |

## 🔒 Autenticação
O sistema utiliza **JWT** para autenticação. Para acessar rotas protegidas, inclua o token no **header**:
