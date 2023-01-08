## Description

This is a simple meal addon application built using the Nest, ObjectionJS and Knex.

## Technologies

NEST JS - Framework
ObjectionJS - ORM
Knex - SQL

## Prerequisites

To use the application, you need to have PostgreSQL available locally. You then create a database for the app and include the connection link in the .env file. Just as shown in the .env.example

## Installation

```bash
$ npm install
```

## Running the app locally

```bash
$ npm run migrate && npm run seed
$ npm run start

API is accessible at `http://localhost:3000`

# watch mode
$ npm run start:dev

```

### Endpoints

```bash
# Create brand
POST http://localhost:3000/v1/brands

Data- '{ "name": "KFC" }'

Header - 'Content-Type: application/json'
# FindAll brands
GET http://localhost:3000/v1/brands


# FindOne brand
GET http://localhost:3000/v1/brands/:brandId


# Create brand addon
POST http://localhost:3000/v1/brands/:brandId/addons

Data - '{
    "name": "Coleslaw",
    "description": "Fruity salad to add a nature blast to your meal",
    "price": 1500,
    "category": "Toppings"
}'

Header - 'Content-Type: application/json'

# Add new brand addon category
POST http://localhost:3000/v1/brands/:brandId/addon-categories

Data - '{ "name": "Coleslaw" }'

Header - 'Content-Type: application/json'

# Get all brand addons
GET http://localhost:3000/v1/brands/:brandId/addons

# Get single brand addon
GET http://localhost:3000/v1/brands/:brandId/addons/:addonId

# Update brand addon
PATCH http://localhost:3000/v1/brands/:brandId/addons/:addonId

Data - '{
    "name": "Coleslaw",
    "description": "Fruity salad to add a nature blast to your meal",
    "price": 1500,
    "category": "Toppings"
}'

Header - 'Content-Type: application/json'

# Delete brand addon
DELETE http://localhost:3000/v1/brands/:brandId/addons/:addonId


# Authorization
All request require authorization to be accessed. Dummy user authorization token can be accessed at 'src/utilities/DummyUsers.ts'

```

## Stay in touch

```bash
- Author - [Adefolaju Ariyo](https://adefolajuariyo.com)
- LinkedIn - [Adefolaju Ariyo](https://www.linkedin.com/in/adefolaju-ariyo-527a49113//)
- Twitter - [Adefolaju Ariyo](https://twitter.com/Hurntre)

```
