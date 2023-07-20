<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# Customer Management Project

## The project

A simple customer management system with CRUD operations.

## Stack

- [Laravel](https://laravel.com/).
- [ReactJS](https://react.dev).
- [Typescript](https://www.typescriptlang.org).
- [Tailwind](https://tailwindcss.com).

## Technical Description

This project was developed with Laravel, ReactJS and Typescript and its purpose is to be a simple dashboard to make CRUD operations with the system stored customers.

For the frontend I used ReactJS with typescript to have a better typing in the project and React Router for routing. I also used Tailwind for stylization. `(resources/src/)` 

For this project I separete the application in modules (`app/Modules`) and each module contains their own Models, and Business Rules. I also used the spatie/laravel-data package for using DTOs in the project.

I also using Actions (`App/Modules/Customer/Actions`) to store all business logic which are used in the controllers in favor of have a better separation of responsibilities.

Finally I used the Value Objects pattern to store complex types such as CPF (Brazilian Indetification Document) `(app/Modules/Customer/ValueObjects/CPF.php)`.

### Folder Structure

`app` - All of the application code, including the business rules and the endpoints.

`bootstrap` - Default laravel bootstrap functions.

`config` - Default laravel and third part libs configurations.

`database` - Contains the application database migrations, seeders and model factories.

`public` - Public application files.

`resources` - Application frontend resources. The ReactJS code is located inside this folder.

`storage` - Application stored assets.

`tests` - Application tests.

`phpcs.xml` - Used to lint the php and to have a standard code style.

## Requirements

- PHP 8.1 or higher and Composer.
- Docker and Docker Compose.
- NodeJS 16 or higher.
- Laravel Valet.

## Running the project

Copy the .env.example file for the .env file.

```zsh
cp .env.example .env
```

If you don't have the laravel valet installed set the `APP_URL` env var with your app URL.
If you don't have the laravel valet installed, or you are not using https, remove this code snippet of your `vite.config.js` file:

```javascript
valetTls: 'customer-management.test'
```

Run these following commands in your terminal

```zsh
composer install
```

```zsh
yarn && yarn build
ou
npm install && npm run build
```

If you are not using docker, change the database variables located at your `.env` file for your database variables.
If you are using docker run the following command:

```zsh
docker compose up -d --build
```

And run the following command afterwards (The --seed parameter is optional and should be used if you want to seed your database):

```zsh
php artisan migrate:refresh --seed
```

Run these commands if you want to test the application (If you are not using docker you must change the database variables at the `phpunit.xml` file for your database variables):

```zsh
php artisan test --testsuite=Unit --stop-on-failure
php artisan test --testsuite=Feature --stop-on-failure
```

## Endpoints

List of all customers stored in the database (whith filter options):

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

Store a new customer:

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

Remove a customer from database:

`DELETE /api/customers/{:customerId}`

Update a customer:

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

Retrieves a single customer from the database:

`GET /api/customers/{:customerId}`

## Frontend

The frontend was developed with ReactJS and is located at `resources/src`
