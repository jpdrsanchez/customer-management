<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# Customer Management Project

## O Projeto

Um painel simples para cadastro, listagem, atualização e deleção de clientes.

## Tecnologias

- [Laravel](https://laravel.com/).
- [ReactJS](https://react.dev).
- [Typescript](https://www.typescriptlang.org).
- [Tailwind](https://tailwindcss.com).

## Requisitos

- PHP 8.1 ou superior e Composer.
- Docker e Docker Compose.
- NodeJS 16 ou Superior.
- Laravel Valet.

## Rodando o Projeto

Copie o arquivo .env.example para o .env

```zsh
cp .env.example .env
```

Caso não tenha o valet instalado configura a váriavel `APP_URL` com o endereço que será usado na aplicação.
Caso não tenha o valet instalado, ou esteja o utilizando sem https, remova este trecho no arquivo `vite.config.js`:

```javascript
valetTls: 'customer-management.test'
```

Após isso realize a instação do composer, e do yarn

```zsh
composer install
```

```zsh
yarn && yarn build
```

Caso não utilize o docker, mude as variáveis do banco de dados no `.env` para as váriaveis que irá usar.
Caso utilize o docker rode o seguinte comando

```zsh
docker compose up -d --build
```

Após isso rode as migrations, o parametro --seed é opicional caso queira dados de exemplo já cadastrados no banco:

```zsh
php artisan migrate:refresh --seed
```

Para rodar os testes unitários ou feature tests digite (Caso não esteja usando o docker é necessário parametrizar as
informações do banco de dados no arquivo `phpunit.xml`):

```zsh
php artisan test --testsuite=Unit --stop-on-failure
php artisan test --testsuite=Feature --stop-on-failure
```

## Endpoints

Listagem e filtragem de todos os clientes:

`GET /api/customers`

```
Query Params:
page?: int
per_page?: int
name?: string
document?: string
birthdate?: string (Y-m-d)
gender?: string ('male' | 'female')
state?: string
city?: string
```

Criação de Cliente:

`POST /api/customers`

```
Body Params:
name: string
document: string
birthdate: string (Y-m-d)
address: string
gender: string ('male' | 'female')
state: string
city: string
```

Deleção de Cliente:

`DELETE /api/customers/{:customerId}`

Atualização de Cliente:

`PUT /api/customers/{:customerId}`

```
Body Params:
name?: string
document?: string
birthdate?: string (Y-m-d)
address?: string
gender?: string ('male' | 'female')
state?: string
city?: string
```

Exibição de dados de um único cliente:

`GET /api/customers/{:customerId}`

## Frontend

O frontend foi feito em react no próprio projeto, e está localizado em `resources/src`
