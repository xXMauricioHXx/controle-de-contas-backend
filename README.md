# CTM - Controle de Contas(Backend)

CTM é um projeto para controle de contas pessoais, visa o gerenciamento de gastos no mês para um maior controle do dinheiro e para ter informações detalhadas sobre cada conta, como quem fez a conta, o dia em que foi feito, o valor da conta, etc.

## Iniciando o projeto

Para iniciar o projeto é necessário fazer o download ou o clone do repositório. Com o repositório em mãos siga os próximos passos para rodar a API REST em localhost.

### Instalação

Pelo terminar vá até a pasta do projeto clonado.

```
npm install
npm run test
node run dev
```

Com o `backend` inicializado, acesse:

* http://localhost:3000/v1/contas - Lista todas as contas;
* http://localhost:3000/v1/cartao - Lista todos os cartões;
* http://localhost:3000/v1/contas - Lista todos os usuários;

## Para rodar os testes

```
npm run test
```

## Construido com

* [express](https://expressjs.com/pt-br/) - Framework backend para aplicações web com nodeJS
* [mongodb](https://www.mongodb.com/) - Banco de dados não relacional orientado a documentos para a persistência dos dados


## Autor

* **Mauricio Henrique** - [LinkedIn](https://www.linkedin.com/in/mauricio-henrique-1249b5154/)