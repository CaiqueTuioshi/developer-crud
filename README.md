# developer-crud

## Instalação usando Docker:
Comece clonando a aplicação (https://github.com/lucasgaricoix/developer-crud.git)

Depois de clonar o repositório, pelo terminal navegue até o diretório da pasta `developer-crud` e execute o comando:

```bash
sudo docker-compose up
```

A aplicação do back-end e front-end deve iniciar simultaneamente e será possível começar a testar a aplicação.

O front-end pode acessar abrindo o browser, usando a url: http://localhost:3000

Os endpoints do back-end pode ser utilizado fazendo as requisições pela url: http://localhost:3003

## Instalação sem Docker:
Depois de clonado o repositório, navegue até a raiz do diretório `developer-crud`.

#### Front-end

Acessar a pasta do front-end:
```bash
cd web-developer
```

Rodar os testes:
```
yarn test
```

Iniciar a aplicação:
```bash
yarn start
```

#### Back-end
Acessar a pasta do back-end:
```bash
cd server-developer
```

Rodar os testes:
```
yarn test
```

Iniciar a aplicação:
```bash
yarn start:dev
```

O front-end pode acessar abrindo o browser, usando a url: http://localhost:3000

Os endpoints do back-end pode ser utilizado fazendo as requisições pela url: http://localhost:3003

## Tecnologias utilizadas:

#### Front-end
Desenvolvido utilizando [React](https://reactjs.org/), atráves do bootstrap [Create React App](https://github.com/facebook/create-react-app).

#### Back-end
Deselvolvido utilizando [NestJS](https://github.com/nestjs/nest).
