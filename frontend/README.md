# Frontend

## Introduction

ToDos is a React project with [React Hooks](https://reactjs.org/docs/hooks-intro.html), [styled-components](https://styled-components.com/), [axios](https://github.com/axios/axios), [@reduxjs/toolkit](https://redux-toolkit.js.org/) and the use of several npm libraries / packages to achieve the goals of building a ToDos page with good UXUI and complete testing

### Assumptions

A user should be able to

 1. Log in and Log out of the website

 2. Retrieve personal data
 
 2. Retrieve genetic result

This project used the idea of atoms designs, which makes the code more organized, testable and scalable. For reference, [ATOM Design](http://atomicdesign.bradfrost.com/chapter-2/)

### Packages 
- styled-components
  - for component stylings, avoid inline styling and the use of css

- @reduxjs/toolkit
  - state management tool for the React

- react-router-dom
  - Page routing

- dayjs
  - lightweight package for datetime manipulation

- semantic-ui-react
  - base ui component library

- axios
  - Http request package

- Jest & Enzyme
  - Unit testing

- eslint & prettier
  - Format & Beautify code

---

## Project tree

 * [Entry File](./index.js)
 * [App.tsx](./App.js)
 * [src](./src)
    * [core](./src/core)
      * [assets](./src/core/assets)
      * [components](./src/core/components)
      * [lib](./src/core/lib)
        * [hooks](./src/core/lib/hooks)
        * [contexts](./src/core/lib/contexts)
        * [theme](./src/core/lib/theme)
        * [utils](./src/core/lib/utils)
    * [pages](./src/pages)
      * [login](./src/pages/login)
      * [profile](./src/pages/profile)
      * [result](./src/pages/result)
    * [redux](./src/redux)
      * [auth](./src/redux/auth)
      * [store.js](./src/redux/store.js)

---

## Quick Start

For development, you will need Node.js and a node global package, NPM, installed in your environment.

### Prerequisite

1. Create `.env` file & put the endpoint base url in the _REACT_APP_API_ENDPOINT_ field

    ```
      REACT_APP_AUTH_TOKEN=REACT_GENETIC_RESULT_AUTH_TOKEN
      REACT_APP_API_ENDPOINT=http://localhost:8080
    ```

### Start Server
  - Project runs on http://localhost:3000

    ```
        $  yarn install
        $  yarn start
    ```

### Test

    $ yarn test

### Format Code

    $ yarn lint:fix

### Build

    $ yarn build
    
---

### TODOs

  - Make component like ___Button___, ___FormInput___ and etc reusable
  
  - Add mobile responsive design

  - Better construct the hooks helper to be reusable in different components

  - Result page should be provide UI for different types of genetic result, like retrieving the type from Backend & display a dropdown for retrieval

  - Get rid of the relative path import, it looks bad lol