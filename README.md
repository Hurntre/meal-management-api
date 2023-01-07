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
# findAll brands
GET http://localhost:3000/v1/api/brands

Authorization - 'Bearer {{adminToken}}'

# findOne brand
GET http://localhost:3000/v1/api/brands/:brandId

Authorization - 'Bearer {{adminToken}}'

# Create brand addon
POST http://localhost:3000/v1/api/brands/:brandId/addons

Data - '{
    "name": "Coleslaw",
    "description": "Fruity salad to add a nature blast to your meal",
    "price": 1500,
    "category": "Toppings"
}'

Header - 'Content-Type: application/json'
Authorization - 'Bearer {{adminToken}}'

# Add new brand addon category
POST http://localhost:3000/v1/api/brands/:brandId/addon-categories

Data - '{
    "name": "Coleslaw"
}'

Header - 'Content-Type: application/json'
Authorization - 'Bearer {{adminToken}}'

# Get all brand addons
GET http://localhost:3000/v1/api/brands/:brandId/addons

Authorization - 'Bearer {{adminToken}}'

# Get single brand addon
GET http://localhost:3000/v1/api/brands/:brandId/addons/:addonId

Authorization - 'Bearer {{adminToken}}'

# Update brand addon
PATCH http://localhost:3000/v1/api/brands/:brandId/addons/:addonId

Data - '{
    "name": "Coleslaw",
    "description": "Fruity salad to add a nature blast to your meal",
    "price": 1500,
    "category": "Toppings"
}'

Header - 'Content-Type: application/json'
Authorization - 'Bearer {{adminToken}}'

# Delete brand addon
DELETE http://localhost:3000/v1/api/brands/:brandId/addons/:addonId

Authorization - 'Bearer {{adminToken}}'

```

## Stay in touch

- Author - [Adefolaju Ariyo](https://adefolajuariyo.com)
- LinkedIn - [Adefolaju Ariyo](https://www.linkedin.com/in/adefolaju-ariyo-527a49113//)
- Twitter - [Adefolaju Ariyo](https://twitter.com/Hurntre)

```

```
