![Logo do KomuniUI](logo.svg)

# KomuniUI API

*Conectando quem tá perto!*

KomuniUI é uma API que visa facilitar a comunicação entre pessoas de uma comunidade local, com funcionalidades para criar avisos, eventos, pedidos e solicitações, e comentários. A API foi desenvolvida para organizar essas informações de maneira simples, eficiente e sem a bagunça de grupos informais de comunicação.

## Recursos Utilizados

Este projeto utiliza os seguintes recursos:

- **Node.js:** Ambiente JavaScript no servidor.
- **Express:** Framework para criar APIs e rotas.
- **Sequelize:** ORM para bancos relacionais.
- **PostgreSQL:** Banco de dados relacional robusto.
- **EJS:** Template engine para HTML dinâmico.
- **JWT:** Autenticação via tokens.
- **Swagger:** Documentação interativa de APIs.
- **Jest:** Framework para testes automatizados.
- **Supertest:** Testa APIs HTTP de forma prática.

## Configuração do Projeto

### Requisitos

- Node.
- NPM (Node Package Manager).

## Passo a Passo para Inicializar o Projeto

### Clonar o Repositório

Primeiro, clone o repositório para o seu ambiente local:

```
git clone https://github.com/RyanM-Ferreira/KomuniUI-API.git

cd KomuniUI-API
```

## Instalar Dependências

Instale todas as dependências necessárias do projeto:

```
npm install
```

## Configurar o Banco de Dados

O projeto usa o SQLite para armazenar os dados. Ao rodar o projeto pela primeira vez, o banco de dados será criado automaticamente.

## Rodar o Projeto

Para iniciar o servidor em modo de desenvolvimento (nodemon), utilize o comando:

```
npm run start:dev
```

## Acessar a API

A API estará disponível localmente em: [http://localhost:3000](http://localhost:3000)

Essa é uma API REST, ou seja, não possui interface visual - as interações são feitas por meio de requisições HTTP (como GET, POST, PUT, DELETE) usando ferramentas como Postman, Insomnia ou diretamente pelo Swagger.

## Início do Front-End

Atualmente, as telas de login e cadastro estão implementadas e podem ser acessadas localmente em: [http://localhost:3000/signup](http://localhost:3000/signup).

## Documentação com Swagger

A documentação interativa da API, onde é possível visualizar as rotas disponíveis, seus parâmetros e testar requisições diretamente pelo navegador, está disponível em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Estrutura de Rotas

A API é estruturada com as seguintes rotas principais:

- **/users**: Rota para gerenciar usuários.
- **/posts**: Rota para criar e listar publicações.
- **/comments**: Rota para interagir com comentários de publicações.

## Testes

O projeto possui testes automatizados com Jest. Para rodar todos os testes, utilize o comando:

```
npm run test-global
```

Você também pode rodar testes específicos para usuários, comentários ou postagens:

```
npm run test-users
npm run test-comments
npm run test-posts
```

## Estrutura do Projeto

- **app.js**: Arquivo principal para inicializar o servidor.
- **routes/**: Contém as rotas da API.
- **models/**: Contém a definição das tabelas do banco de dados usando Sequelize.
- **tests/**: Contém os testes automatizados.
- **database/**: Contém os arquivos de configuração do banco de dados (por exemplo, configurações de conexão e inicialização).
- **swagger.js**: Arquivo responsável pela configuração e geração da documentação da API usando Swagger.

## Considerações Finais

Este projeto foi desenvolvido como parte do Hackateen, com o objetivo de criar uma plataforma simples e eficiente para melhorar a comunicação nas comunidades locais.
