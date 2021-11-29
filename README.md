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



Fiquem à vontade em usar ou até mesmo testar ambas as conexões!! :)  