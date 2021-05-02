# Teste de Recrutamento DTI 
Teste de seleção DTI por Gustavo Costa Tayer. 
Dado a prova e os problemas sugeridos foi decido a criar o projeto com a seguinte arquitetura:
- NestJs (nodeJs)
- Postgresql
- ReactJs

Para melhor separação do projeto o front e back-end foram separados em duas pastas distintas (server e app).

## Banco de dados
Recomendado utilizar o container com o banco de dados criado no docker. Para rodar basta ter o [docker](https://www.docker.com/get-started) instalado na máquina e utilizar o seguinte comando na raiz do projeto:

> $ docker-compose up

## Server

Para compilar o backend basta seguir as seguintes instruções:

>$ cd server 

> $ npm install

> $ npm start

Para mais informações de compilação acessar o README.md dentro da pasta server.

### Swagger - API Pública
- Para acessar o swagger bastar acessar a url com o servidor rodando: http://localhost:3003/swagger
- Para gerar e baixar o arquivo json: http://localhost:3003/swagger-json

## App
Para compilar o front end basta seguir as seguintes instruções:

> $ cd app

> $ npm install

> $ npm start