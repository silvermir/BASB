# Storefront Backend Project

## Getting Started

### 1. Install packages

- run ` npm install` to install all packages

### 2. Add .ENV

- run `touch .env`
- write data:
  - POSTGRES_HOST=127.0.0.1
  - POSTGRES_DB=**choose a dev DataBase name**
  - POSTGRES_TEST_DB=**choose a test DataBase name**
  - POSTGRES_USER= **choose an username**
  - POSTGRES_PASSWORD=**choose a password**
  - ENV=dev
  - PEPPER=**choose a password**
  - SALT_ROUNDS=10
  - TOKEN_SECRET=**choose a sectret**

### 3. DB Creation

- Create a user with password choosen in the .env
- Create Postgres dev & test Databases with the choosen names in the .env
- Use Port: 5432
- Grant all Privivileges to choosen User

### 4. Scripts

- run `npm run migrate` to migrate the tables
- run `npm run destroy` to delete the tables
- run `npm run test` to start Jasmine-ts
- run `npm run start` to start nodemon listening on port 3000
- run `npm run prettier` to start prettier
- run `npm run lint` to start EsLint
- run `npm run watch` to start tsc-watch
