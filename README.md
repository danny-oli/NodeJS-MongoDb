# Tutorial: Desenvolvendo uma Aplicação RESTful API em Node.Js & Express.Js com MongoDb

CRUD desenvolvido em Node.Js, Express e MongoDb.

## Recursos utilizados no desenvolvimento:

- Node.Js;
- Express.Js  v.4.17
- MongoDb;
- Mongoose 5.12;
- Conceito RestFul;
- Bcrypt (encriptação de senha)
- Dotenv (variáveis de ambiente)
- JSON data (para retornar os dados);
- Insomnia (testar a API com requisições HTTP);


## Testando a Aplicação usando Insomnia:

Caso queira testar as API's criadas no projeto, basta clicar no botão abaixo para ter acesso a todas as rotas já criadas!

<a href="https://insomnia.rest/run/?label=NodeJS-MongoDb&uri=https%3A%2F%2Fgithub.com%2Fdanny-oli%2FNodeJS-MongoDb%2Fblob%2Fmaster%2Fsrc%2FInsomnia%2FInsomnia_2021-11-29.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

Abaixo exemplifico as rotas de usuário!

  ROTA                    |     HTTP(Verbo)   |      Descrição        | 
---------------------     | ----------------- | --------------------- | 
/api/user/findUsers       |       GET         | Selecionar Todos      | 
/api/user/createUser      |       POST        | Criar usuário         | 
/api/user/findUser/:id    |       GET         | Selecionar Por Id     | 
/api/user/updateUser/:id  |       PUT         | Atualizar Por Id      |    
/api/user/deleteUser/:id  |       DELETE      | Excluir Por Id        |

## Executar Localmente

Caso você deseja executar o projeto na sua máquina local, basta seguir os passos abaixo:

## Começando...

Para começar, você deve simplesmente clonar o repositório do projeto na sua máquina e instalar as dependências.

### Pre-Requisitos

Antes de instalar as dependências no projeto, você precisa já ter instalado na sua máquina:

* **Node.Js**: Caso não tenha, basta realizar o download [Aqui](https://nodejs.org/en/)
* **MongoDb**: Caso também não tenha, basta realizar o download [Aqui](https://www.mongodb.com/download-center#community)

### Instalando as Dependências

Abre o cmd (caso esteja utilizando o Windows) e digite a path do seu projeto

```
Exemplo: cd "C:\Users\NomeDoComputador\Documents\..."
```

Depois, quando estiver na pasta do projeto, basta digitar no cmd a seguinte instrução:

```
npm install
```

Ao digitar a instrução acima, automaticamente ele irá baixar todas as dependências listadas no arquivo package.json:

* `node_modules` - que contêm os packages do npm que precisará para o projeto.

### Executando a Aplicação

Bom, agora na mesma tela do cmd, basta iniciar o server para o projeto ser executado localmente.

```
node run dev
```

Pronto! Agora, sua API será executada de maneira local na sua máquina utilizando a PORT 3001.        

Conforme requisitado, foi realiado deploy da API utilizando o serviço HEROKU.
Url: https://danny-nodejs-mongodb-api.herokuapp.com/.

Chamada de teste realizada em 29/11/21 às 02:50:
endpoint: https://danny-nodejs-mongodb-api.herokuapp.com/api/user/findUsers
result: 
[
  {
    "_id": "61a4556e8d08303e14c0ae7c",
    "username": "admin",
    "password": "$2b$10$3cl4YcYw8EGOZHq9hL1vc.yMUkwNc.xBmp/8CIJAMyEH146nrOzwm",
    "createdAt": "2021-11-29T04:22:06.432Z",
    "updatedAt": "2021-11-29T04:22:06.432Z",
    "__v": 0
  }
]


Fiquem à vontade para testar ambas as conexões!! :)  