# Customer API 1.0

## Teste técnico backend Stone

## Descrição

Devido a um grande crescimento, apareceu uma necessidade de um cadastro
performático e seguro para os clientes da empresa.
O escopo desse projeto é a implementação do backend desse sistema, que deve ser uma RESTful API que suporta as seguintes operações:

- Salvar um cliente novo
- Atualizar um cliente existente
- Buscar um cliente por ID

Para garantir a segurança dos dados cadastrados, a empresa disponibiliza uma API para
autorização de acesso às operações disponíveis.

### Stack de desenvolvimento

- NodeJS
- NestJS
- Axios
- Typescript
- IoRedis
- Jest

### Clone o repositório do projeto

1. Clone o repositório do projeto:
`git clone https://github.com/Eurico77/custumer-api.git`
2. Acesse o diretório do projeto:
`cd custumer-api`
3. Instale as dependências:
`npm install ou yarn`
4. Crie um arquivo .env na raiz do projeto e copie todas as constantes
do arquivo .env.example

5. Certifique-se de substituir os valores das variáveis de ambiente de acordo com a configuração do seu ambiente.

6. Após a conclusão da instalação das dependências e a configuração das variáveis de ambiente, você estará pronto para executar o projeto.

## Instruções para executar o Redis

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Se ainda não os tiver instalado, você pode encontrar instruções de instalação em:

- Docker: <https://docs.docker.com/get-docker/>
- Docker Compose: <https://docs.docker.com/compose/install/>

Após instalar o Docker e o Docker Compose, certifique-se de estar no diretório raiz do projeto custumer-api.

No terminal, execute o seguinte comando para iniciar os contêineres definidos no arquivo docker-compose.yaml:

```docker-compose up -d```

- O parâmetro -d inicia os contêineres em segundo plano (modo detach). Isso permite que você execute outros comandos no mesmo terminal sem interromper a execução dos contêineres.

Aguarde até que todos os contêineres sejam iniciados corretamente. O Docker Compose irá baixar as imagens necessárias, criar os contêineres e configurar a rede.

Uma vez que os contêineres estejam em execução, você poderá acessar o banco de dados Redis usando as configurações fornecidas no projeto.

# Startando o projeto

rode o projeto usando os comandos

yarn start:dev ou npm run start:dev

o servidor vai estar disponível na porta em que foi setado no arquivo .env

## Rotas da aplicação

Login

### Descrição:

Esta rota permite que os usuários façam login e obtenham um token de acesso.

Endpoint
`POST /auth/login`

Parâmetros da Solicitação

|  Código | Descrição  | Corpo da Resposta |
| ----------- | ----------- | ----------- |
| 200    | Sucesso  | { "access_token": "TOKEN_DE_ACESSO" }  |
| 400    | Solicitação inválida   | { "message": "Mensagem de erro" }   |
| 500    | Erro interno do servidor  | { "message": "Mensagem de erro" }   |

Exemplo de solicitação

```http
POST /auth/login
Content-Type: application/json

{
  "username": "john.doe",
  "password": "s3cr3tp@ssw0rd"
}
```

Exemplo de resposta

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "TOKEN_DE_ACESSO"
}
```

Exemplo de Erro

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": "Credenciais inválidas"
}
```

Para cada requisição subsequente que requer autenticação, inclua o token de acesso no cabeçalho da requisição.

Adicione um cabeçalho chamado Authorization.
O valor do cabeçalho deve ser no formato Bearer `{token}`, onde `{token}` é o token de acesso recebido após o login.

## Exemplo:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
O servidor verificará o token de acesso fornecido em cada requisição para autenticar e autorizar o usuário. Certifique-se de incluir o cabeçalho Authorization com o token válido em todas as suas requisições autenticadas.
