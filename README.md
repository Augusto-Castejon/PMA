# Personal Activity Manager

## Descrição

O **Personal Activity Manager** é uma aplicação web projetada para gerenciar atividades pessoais. Ele permite que os usuários criem, editem e excluam atividades, além de gerenciar categorias e usuários. A aplicação foi desenvolvida utilizando uma stack moderna, que inclui Vue.js no frontend e Node.js com Express e Prisma no backend, juntamente com um banco de dados MySQL.

## Funcionalidades

- **Gerenciamento de Atividades**: 
  - Adicionar, listar, editar e excluir atividades.
  - Filtrar atividades por usuário.
  - Atribuir categorias às atividades.

- **Gerenciamento de Categorias**:
  - Adicionar, lista, editar e excluir categorias.

- **Gerenciamento de Usuários**:
  - Adicionar, listar, editar e excluir usuários.

## Tecnologias Utilizadas

### Frontend

- **Vue.js**: Framework JavaScript progressivo para a construção de interfaces de usuário.
- **Axios**: Biblioteca para fazer requisições HTTP a partir do navegador.

### Backend

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express.js**: Framework web para Node.js.
- **Prisma**: ORM (Object-Relational Mapping) para Node.js e TypeScript.
- **Postgree**: Sistema de gerenciamento de banco de dados relacional.
- **Swagger**: Ferramenta para documentação de APIs.

## Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Postgree

### Passos para Instalação

1. **Configuração do Backend**:

    - Navegue até a pasta do backend:

      ```sh
      cd backend
      ```

    - Instale as dependências:

      ```sh
      npm install
      ```

    - Configure o banco de dados Postgree e atualize as credenciais no arquivo `.env`.

    - Execute as migrações do Prisma para configurar o banco de dados:

      ```sh
      npx prisma migrate dev
      ```

    - Inicie o servidor backend:

      ```sh
      npm start
      ```

2. **Configuração do Frontend**:

    - Navegue até a pasta do frontend:

      ```sh
      cd ../frontend
      ```

    - Instale as dependências:

      ```sh
      npm install
      ```

    - Inicie o servidor de desenvolvimento do Vue.js:

      ```sh
      npm run serve
      ```

4. **Acesse a aplicação**:

    Abra o navegador e acesse `http://localhost:8080`.
    Para o Swagger acesse: `http://localhost:3025/api-doc/`.

## Estrutura do Projeto

- `backend/`: Código fonte do servidor backend (Node.js, Express, Prisma).
- `frontend/`: Código fonte do frontend (Vue.js).

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
