# Gerenciador de Livros - Integrado com Neon Database

## 📋 Descrição
Sistema completo de gerenciamento de livros com frontend React e backend Node.js/Express integrado ao banco de dados PostgreSQL hospedado no Neon.

## ✅ Status da Integração
- ✅ Conexão com banco Neon configurada
- ✅ Tabelas criadas no banco de dados
- ✅ API REST funcionando
- ✅ CRUD completo implementado
- ✅ Frontend integrado com backend
- ✅ Validações implementadas

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### 1. Instalação do Backend

```bash
cd server
npm install
```

### 2. Configuração do Banco de Dados

O arquivo `.env` já está configurado com a string de conexão do Neon:
```
DATABASE_URL="postgresql://neondb_owner:npg_Skfwm39PWNcT@ep-solitary-morning-ae8nado1-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### 3. Executar o Backend

```bash
cd server
npm start
```

O servidor estará rodando em: `http://localhost:8082`

### 4. Instalação do Frontend

```bash
cd client
npm install
```

### 5. Executar o Frontend

```bash
cd client
npm start
```

O frontend estará rodando em: `http://localhost:3000`

## 🔧 Funcionalidades Implementadas

### Backend (API REST)
- **GET** `/api/books` - Listar todos os livros
- **GET** `/api/books/editBook/:id` - Obter um livro específico
- **POST** `/api/books/addBook` - Criar novo livro
- **PUT** `/api/books/editBook/:id` - Atualizar livro
- **DELETE** `/api/books/:id` - Deletar livro

### Frontend (React)
- Listagem de livros
- Adicionar novo livro
- Editar livro existente
- Excluir livro
- Interface responsiva

## 🗄️ Estrutura do Banco de Dados

### Tabela: books
```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  no_of_pages INTEGER NOT NULL,
  published_at TIMESTAMP(3) NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testando a API

### Listar livros
```bash
curl -X GET http://localhost:8082/api/books
```

### Adicionar livro
```bash
curl -X POST http://localhost:8082/api/books/addBook \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dom Casmurro",
    "author": "Machado de Assis",
    "bookPages": "256",
    "publishDate": "1899-01-01"
  }'
```

### Obter livro específico
```bash
curl -X GET http://localhost:8082/api/books/editBook/1
```

### Atualizar livro
```bash
curl -X PUT http://localhost:8082/api/books/editBook/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Dom Casmurro - Edição Revisada",
    "author": "Machado de Assis",
    "no_of_pages": 280,
    "published_at": "1899-01-01"
  }'
```

### Deletar livro
```bash
curl -X DELETE http://localhost:8082/api/books/1
```

## 📁 Estrutura do Projeto

```
projeto_livros/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   └── service/        # Configuração da API
│   └── package.json
├── server/                 # Backend Node.js
│   ├── config/             # Configurações do banco
│   ├── controllers/        # Controllers da API
│   ├── routes/             # Rotas da API
│   ├── prisma/             # Schema e migrações
│   ├── .env                # Variáveis de ambiente
│   └── package.json
└── README.md
```

## 🔒 Segurança
- Conexão SSL com o banco Neon
- Validação de dados no backend
- Tratamento de erros implementado
- CORS configurado para desenvolvimento

## 📝 Notas Importantes
1. O banco de dados já está configurado e as tabelas foram criadas
2. A API está totalmente funcional e testada
3. O frontend está integrado com o backend
4. Todas as operações CRUD estão funcionando
5. O projeto está pronto para uso em desenvolvimento

## 🐛 Solução de Problemas

### Erro de conexão com banco
- Verifique se o arquivo `.env` está presente no diretório `server/`
- Confirme se a string de conexão está correta

### Erro "relation does not exist"
- Execute o script `create_table.js` no diretório server:
```bash
cd server
node create_table.js
```

### Problemas de CORS
- Verifique se o backend está rodando na porta 8082
- Confirme se o frontend está configurado para acessar `http://localhost:8082`

