# Backend

## Introduction

ToDos is a NodeJS project with [expressJS](https://expressjs.com/), [passportJS](http://www.passportjs.org/), [knex](https://knexjs.org/), [bcrypt](https://github.com/kelektiv/node.bcrypt.js) and the use of several npm libraries / packages to achieve the goals of building a ToDos page with good UXUI and complete testing

### Assumptions

Endpoints should be provided for a user to

 1. Log in and Log out of the website

 2. Retrieve personal data
 
 2. Retrieve genetic result

### Packages 
- expressJS
  - web framework for the APIs

- passportJS
  - authentication middleware

- knex
  - orm library for psql connection

- dayjs
  - lightweight package for datetime manipulation

- bcrypt
  - password hashing & comparing

- winston
  - logger for debugging and monitoring

- morgan
  - HTTP request logger middleware

- jest
  - for testing

- eslint & prettier
  - Format & Beautify code

---

## Project tree

 * [Entry File](./index.js)
 * [App.tsx](./App.js)
 * [server](./server)
    * [middlewares](./server/middlewares)
    * [routers](./server/routers)
    * [services](./server/services)
    * [main.js](./server/main.js)
  * [shared](./shared)
  * [utils](./src/utils)

---

## Quick Start

For development, you will need Node.js and a node global package, NPM, installed in your environment.

### Prerequisite

1. Create `.env` file & put the endpoint base url in the _REACT_APP_API_ENDPOINT_ field

    ```
      PORT=8080
      NODE_ENV=development
      DB_HOST=
      DB_NAME=
      DB_USERNAME=
      DB_PASSWORD=
      JWT_SECRET=
      TOKEN_EXPIRY_TIME=
    ```

### Start Server
  - Project runs on http://localhost:8080

    ```
        $  npm install
        $  npm run start
    ```

### Test

    $ npm test

### Format Code

    $ npm lint:fix
    
---

### TODOs

  - Use asymmetric JWT for better security for storing & extracting sensitive data in the payload in various services amongst the network
  
  - Encryption of genetic result data in the database for security & data privacy concern

  - Create an GET endpoint for retrieving all result type for a user to filter in the frontend

  - Look for replacement for require-dir as it has some issue with Jest

  - Get rid of the relative path import, it looks bad lol