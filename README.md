# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.

#### backend Technologies

    - Node.js
    - Typescript
    - express
    - SQL

#### tools

    - ESLint
    - Nodemon
    - Jasmine
    - Prettier
    - postgresql
    - postman 

## Steps to start

### Scripts

#### Installing

    npm install

#### Build

    npm run build

### EsLint

    npm run lint

### Prettier :

    npm run format

### Run unit tests

    npm run test

### Start server

    npm run start

### Packages

Here are some of packages that were installed.

#### express

`npm i express`
`npm i --save-dev @types/express`

#### typescript

`npm i --save-dev typescript`

#### db-migrate

`npm install -g db-migrate`

#### rimraf

`npm install --save rimraf`

#### bcrypt

`npm i bcrypt`
`npm i --save-dev @types/bcrypt`

#### morgan

`npm install --save morgan`
`npm i --save-dev @types/morgan`

#### jsonwebtoken

`npm install jsonwebtoken `
`npm i --save-dev @types/jsonwebtoken`

#### dot-env

`npm install dotenv --save`

#### jasmine

`npm install jasmine @types/jasmine ts-node --save-dev`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Data Shapes

#### Product

    - id
    - name
    - price
    - category

#### User

    - id
    - user_name
    - first_Name
    - last_Name
    - password

#### Orders

    - id
    - user_id

#### Product order

    - id
    - order_id
    - product_id (id of each product in the order )
    - quantity (quantity of each product in the order)

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`


## Token and Authentication

Tokens are passed along with the http header as

`"Authorization " "Bearer <token>"`



## Set up Database

### Create Databases

We should create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER postgres WITH PASSWORD 'gemy200@';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE store_dev;`
  - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges
  - `\c store_dev`
  - `\c store_test`
