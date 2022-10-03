# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index

* Function -> list all products
* Method -> GET
* http://localhost:3000/products

- Show

* Function -> show specific product
* Method -> GET
* Paramaeter -> id
* http://localhost:3000/products/:id

- Create

* Function -> create product
* Method -> POST
* Paramaeter -> productname, price , category
* Token -> required
* http://localhost:3000/products

- Delete

* Function -> delete product
* Method -> DELETE
* Paramaeter -> id
* http://localhost:3000/products/:id

#### Users

- Index

* Function -> list all users
* Method -> GET
* Token -> required
* http://localhost:3000/users

- Show

* Function -> show specific user
* Method -> GET
* Paramaeter -> id
* Token -> required
* http://localhost:3000/users/:id

- Create

* Function -> create user
* Method -> POST
* Paramaeter -> first name, last name, username, password
* http://localhost:3000/users/register

- Authencicate

* Function -> Authencicate user
* Method -> POST
* Paramaeter -> username, password
* Token -> required
* http://localhost:3000/users/login

- Delete

* Function -> delete user
* Method -> DELETE
* Paramaeter -> id
* Token -> required
* http://localhost:3000/users/:id

#### Orders

- Index

* Function -> list all orders
* Method -> GET
* Token -> required
* http://localhost:3000/orders

- Show

* Function -> show specific order
* Method -> GET
* Paramaeter -> id
* http://localhost:3000/orders/:id

- Create

* Function -> create order
* Method -> POST
* Paramaeter -> order id, order stataus
* Token -> required
* http://localhost:3000/orders

- Add Product

* Function -> add Product to specific order
* Method -> POST
* Paramaeter -> id, quantity, order_id, product_id
* Token -> required
* http://localhost:3000/orders/:id/products

#### Dasshboards

- Products in orders

* Function -> show porducts in orders
* Method -> GET
* http://localhost:3000/products_in_orders

- Users with orders

* Function -> show users with orders
* Method -> GET
* http://localhost:3000/users_with_orders

## Data Shapes

#### Product Table

| Variables    | DataType           |
| ------------ | ------------------ |
| id           | SERIAL PRIMARY KEY |
| product_name | VARCHAR            |
| price        | integer            |
| category     | VARCHAR            |

#### User Table

| Variables       | DataType           |
| --------------- | ------------------ |
| id              | SERIAL PRIMARY KEY |
| username        | VARCHAR            |
| password_digest | VARCHAR            |

#### Orders Table

| Variables    | DataType           |
| ------------ | ------------------ |
| id           | SERIAL PRIMARY KEY |
| order_status | VARCHAR            |
| user_id      | integer            |

#### Order_Products Table

| Variables  | DataType           |
| ---------- | ------------------ |
| id         | SERIAL PRIMARY KEY |
| quantity   | integer            |
| order_id   | integer            |
| product_id | integer            |
