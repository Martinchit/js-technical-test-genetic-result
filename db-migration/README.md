# DB Migration file

## Introduction

This is a repo for handling database migration, including the migrate and seed files. [Knex](https://knexjs.org/) and [PSQL](https://www.postgresql.org/) are used

### Assumptions

A user should be able to

 1. Log in and Log out of the website

 2. Retrieve personal data
 
 2. Retrieve genetic result

This project used the idea of atoms designs, which makes the code more organized, testable and scalable. For reference, [ATOM Design](http://atomicdesign.bradfrost.com/chapter-2/)

### Packages 
- knex
  - package for data migration

- randomstring
  - generate random string for user policy code

- dotenv
  - environment variables

---

## Project tree

 * [migrations](./migrations)
 * [seeds](./seeds)
 * [knexfile](./knexfile.js)

---

## Quick Start

For development, you will need Node.js and a node global package, NPM, installed in your environment.

### Prerequisite

1. Create `.env` file & put the endpoint base url in the _REACT_APP_API_ENDPOINT_ field

    ```
      DB_NAME=
      DB_USERNAME=
      DB_PASSWORD=
      DB_HOST=
    ```

### Install

  $  npm install

### migrate:development

    $ yarn run migrate-development

### seed:development Code

    $ yarn run seed:development

---

### Remarks

  - Make sure database is created in the PSQL
  
  - Read the knexfile to see what other environment variables needed for deployment in other env, like testing, staging and production