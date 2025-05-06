![Logo do KomuniUI](logo.svg) 
# KomuniUI API
*Conectando quem tá perto!*

KomuniUI é uma API que visa facilitar a comunicação entre pessoas de uma comunidade local, com funcionalidades para criar avisos, eventos, pedidos e solicitações, e comentários. A API foi desenvolvida para organizar essas informações de maneira simples, eficiente e sem a bagunça de grupos informais de comunicação.

## Tecnologias Utilizadas
Este projeto utiliza as seguintes tecnologias:

- **Node.js:** Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework para Node.js, utilizado para criar as rotas da API.
- **Sequelize**: ORM (Object Relational Mapping) para interação com o banco de dados SQLite.
- **SQLite3**: Banco de dados relacional simples e eficiente.
- **JWT (JSON Web Token)**: Utilizado para autenticação de usuários.
- **Swagger**: Ferramenta de documentação interativa da API.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **Supertest**: Biblioteca para testar APIs HTTP.

## Configuração do Projeto
### Requisitos
- Node.
- NPM (Node Package Manager).

## Passo a Passo para Inicializar o Projeto

### Clonar o Repositório
Primeiro, clone o repositório para o seu ambiente local:
```
git clone https://github.com/RyanM-Ferreira/hackateen-backend-builder-2025

cd hackateen-backend-builder-2025
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
