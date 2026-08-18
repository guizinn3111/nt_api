# nt_api — API de Notas e Tarefas

API REST em Node.js para gerenciamento de usuários, autenticação e notas com prazo. Projeto de estudo focado em **organização por domínio** e em escrever a camada de acesso a dados sem ORM.

> ⚠️ **Em desenvolvimento.** O domínio de notas já tem serviço, controller e rotas, mas ainda não está montado no `app.js`. Autenticação e usuários estão funcionais.

## Organização

O projeto separa o código por **domínio** em vez de por tipo de arquivo. Cada domínio carrega suas próprias rotas, controller e serviço:

```
src/
├── server.js              # ponto de entrada
├── app.js                 # configura Express, middlewares e rotas
├── database/              # conexão com PostgreSQL (pool pg)
└── domains/
    ├── auth/              # login e emissão de JWT
    ├── users/            # cadastro e consulta de usuários
    └── notes/            # criação de notas (em progresso)
```

A ideia é que adicionar uma funcionalidade signifique criar uma pasta, não espalhar arquivos por quatro diretórios diferentes.

## Camadas

- **Route** — declara o endpoint e delega
- **Controller** — lê a requisição, chama o serviço, monta a resposta
- **Service** — regra de negócio e acesso ao banco, com SQL parametrizado

## Funcionalidades

**Autenticação**
- `POST /auth/signin` — login com emissão de JWT

**Usuários**
- Cadastro com senha em hash bcrypt
- Consulta

**Notas** *(implementado, ainda não exposto)*
- Criação com título, descrição e data de vencimento, vinculada ao usuário

## Stack

- Node.js + Express 5
- PostgreSQL com o driver `pg` (sem ORM — SQL escrito à mão, sempre parametrizado)
- JWT para autenticação
- bcrypt para hash de senha
- dotenv para configuração

## Como rodar

```bash
npm install
cp .env.example .env    # preencha as credenciais do PostgreSQL e o segredo do JWT
npm run dev
```

## Próximos passos

- [ ] Montar as rotas de notas no `app.js`
- [ ] Listagem, edição e exclusão de notas
- [ ] Middleware de autenticação nas rotas protegidas
- [ ] Testes de integração dos endpoints
