# Blogs API

## Descrição 
Esse projeto foi desenvolvido para a criação de uma API com o banco de dados Mysql, destinados para a criação de um blog. Durante o desenvolvimento, foi criada uma aplicação em Node.js utilizando o pacote sequelize para implementar as funcionalidades de criação, (CRUD) de posts, e login. Foram criados endpoints que estão conectados ao banco de dados, seguindo os princípios do REST. Para criar um post, é preciso fornecer dados de usuário e realizar o login, o que reforça a conexão entre usuário e post. Além disso, foram usadas categorias para classificar os posts, estabelecendo ligações entre posts e categorias, assim como entre categorias e posts.

## Tecnologias e Ferramentas

<details>
  <summary><strong>💾 Back-end</strong></summary>
  
- [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- JOI - Descrição de esquema e validador de dados para JavaScript.
- ORM - Interface da aplicação com o banco de dados.
- POO - Programação Orientada a Objetos.
- SOLID
</details>

<details>
  <summary><strong>🕵️ Alinhamento de código</strong></summary>
  
- [ESlint](https://eslint.org/)
</details>

## Execução do Projeto

<details>
<summary><strong>⚙️ Configurações</strong></summary>
1.Clone o Projeto.

    git@github.com:ViniciusSoares21/blogs-api.git
    
2.Entre no diretório do projeto

    blogs-api

3.<strong>Na pasta do projeto </strong>, suba os containers blogs_api, e blogs_api_db. <br />
  -   ⚠️ Para rodar a aplicação dessa forma você deve ter o [Docker](https://www.docker.com/) instalado na sua máquina.
  
    docker-compose up -d --build

5.Rode o container blogs_api via CLI ou abri-lo no VS Code
    
    docker exec -it blogs_api bash
    
4.Instale as dependências rodando o comando abaixo.

    npm install
    
</details>

<details>
<summary><strong>🚀 Inicialização</strong></summary>

Dentro do container blogs_api rode o comando 

    npm start

Se quiser popular o banco de dados rode o comando

    npm run seed

</details>

## Exemplos de uso
<details>
  <summary><strong>👩‍💼 Recursos de usuários</strong></summary>
  <details>
    <summary><strong>POST  /user</strong></summary>
    
  - Cria um novo usuário
    ```json
    {
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "password": "123456",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
      // a imagem não é obrigatória
    }
    ```
  - Retorno com SUCESSO
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
    ```
  - Retorno com ERRO
    - `displayName` menor que 8 caracteres
      ```json
          STATUS http `400`
          {
            "message": "\"displayName\" length must be at least 8 characters long"
          }
       ```
    - `email` com formato inválido
      ```json
          STATUS http `400`
          {
            "message": "\"email\" must be a valid email"
          }
       ```
    - `password` menor que 6 caracteres
      ```json
          STATUS http `400`
          {
            "message": "\"password\" length must be at least 6 characters long"
          }
       ```
    - `email` já existe
      ```json
          STATUS http `409`
          {
            "message": "User already registered"
          }
       ```
  </details>
  <details>
    <summary><strong>POST  /login</strong></summary>
    
  - Dados para login
    ```json
    {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
    }
    ```
  - Retorno com SUCESSO
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
    ```
  - Retorno com ERRO
    - todos os campos preenchidos
      ```json
          STATUS http `400`
          {
            "message": "Some required fields are missing"
          }
       ```
    - usuário que não existe `email` e `password` errados/inexistentes
      ```json
          STATUS http `400`
          {
            "message": "Invalid fields"
          }
       ```
  </details>
  <details>
    <summary><strong>GET /user</strong></summary>
    
  - Retorna todos os usuários do banco de dados
    ```json
    [
      {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },

      /* ... */
    ]
    ```
  - Retorno com ERRO
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>GET /user/:id</strong></summary>
    
  - Retorna um usuário do banco de dados
    ```json
    {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
    ```
  - Retorno com ERRO
    - `usuário` inexistente
      ```json
          STATUS http `404`
          {
            "message": "User does not exist"
          }
       ```
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>DELETE  /user/me</strong></summary>
    
  - Deleta o próprio usuário do banco de dados, baseado no `id` que esta dentro do `token`
    - `status 204`
  - Retorno com ERRO
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
</details>

<details>
  <summary><strong>🏷️ Recursos de categorias</strong></summary>
  <details>
    <summary><strong>POST  /categories</strong></summary>
    
  - adiciona uma nova categoria no banco de dados
     ```json
         {
            "name": "Typescript"
         }
     ```
  - Retorno com SUCESSO
    ```json
      {
        "id": 3,
        "name": "Typescript"
      }
    ```
  - Retorno com ERRO
    - `name` preenchido
      ```json
          STATUS http `400`
          {
            "message": "\"name\" is required"
          }
       ```
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>GET  /categories</strong></summary>
    
  - Retorna todas categorias do banco de dados
     ```json
     [
        {
            "id": 1,
            "name": "Inovação"
        },
        {
            "id": 2,
            "name": "Escola"
        },

        /* ... */
     ]
     ```
  - Retorno com ERRO
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
</details>

<details>
  <summary><strong>📝 Recursos para postar blog</strong></summary>
  
  <details>
    <summary><strong>POST  /post</strong></summary>
    
  - adiciona um novo blog post no banco de dados
     ```json
     {
       "title": "Latest updates, August 1st",
       "content": "The whole text for the blog post goes here in this key",
       "categoryIds": [1, 2]
     }
     ```
  - Retorno com SUCESSO
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "updated": "2022-05-18T18:00:01.196Z",
      "published": "2022-05-18T18:00:01.196Z"
    }
    ```
  - Retorno com ERRO
    - Todos os campos precisam estar preenchidos
      ```json
          STATUS http `400`
          {
            "message": "Some required fields are missing"
          }
       ```
    - `categoryIds` inexistente
      ```json
          STATUS http `400`
          {
            "message": "one or more \"categoryIds\" not found"
          }
       ```
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>GET  /post</strong></summary>
    
  - Retorna todos blog post do usuário dono
     ```json
     [
        {
          "id": 1,
          "title": "Post do Ano",
          "content": "Melhor post do ano",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 1,
              "name": "Inovação"
            }
          ]
        },
        
        /* ... */
     ]
     ```
  - Retorno com ERRO
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>GET  /post/:id</strong></summary>
    
  - Retorna um blog post baseado no `id`
    ```json
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
          {
              "id": 1,
              "name": "Inovação"
          }
      ]
    }
    ```
  - Retorno com ERRO
    -  blogpost inexistente
       ```json
         STATUS http `404`
        {
          "message": "Post does not exist"
        }
       ```
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>PUT  /post/:id</strong></summary>
    
  - altera um post do banco de dados
    ```json
    {
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key"
    }
    ```
  - Retorno com SUCESSO
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2022-05-18T18:00:01.000Z",
      "updated": "2022-05-18T18:07:32.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
    ```
  - Retorno com ERRO
    -  Não é possível editar um blogpost com outro usuário
       ```json
         STATUS http `401`
        {
          "message": "Unauthorized user"
        }
       ```
    -  Não é possível editar sem todos os campos preenchidos
       ```json
         STATUS http `400`
        {
          "message": "Some required fields are missing"
        }
       ```
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>DELETE  /post/:id</strong></summary>
    
  - Deleta um blog post baseado no `id`
    - `status 204`
  - Retorno com ERRO
    -  Não é possível deletar um blogpost com outro usuário
       ```json
         STATUS http `401`
        {
          "message": "Unauthorized user"
        }
       ```
    -  Não é possível deletar um blogpost inexistente
       ```json
         STATUS http `404`
        {
          "message": "Post does not exist"
        }
       ```
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
  <details>
    <summary><strong>GET  /post/search</strong></summary>
    
  - Retorna blogs post baseados no `titulo` do banco de dados
    ```json
    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```
  - Retorna blogs post baseados no `content` do banco de dados
    ```json
    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```
  - Retorna blogs post quando passa a busca vazia
    ```json
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      
      /* ... */
    ]
    ```
  - Retorna blogs post inexistente
    ```json
      []
    ```
  - Retorno com ERRO
    - ⚠️ `TOKEN` inexistente
      ```json
          STATUS http `401`
          {
            "message": "Token not found"
          }
       ```
    - ⚠️ `TOKEN` invalido
      ```json
          STATUS http `401`
          {
            "message": "Expired or invalid token"
          }
       ```
  </details>
</details>

## Diagrama ER
 <img src="https://github.com/tryber/sd-023-b-project-blogs-api/blob/master/public/der.png?raw=true" alt="diagrama er" />
 
## Criado por [Vinicius Soares](https://www.linkedin.com/in/vinicius-soares21/)
    
