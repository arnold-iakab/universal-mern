# universal-mern

## Description
Feeling overwhelemed by other complex boilerplates and desiring to understand how things work, I combined various implementations and created a personal boilerplate for a Universal React application based on the MERN ( MongoDB, Express, React, Node ) stack.
The project also integrates Redux, Saga and JWT (Json Web Token ) authentication and has hot-reload functionality.

## Prerequisites
* Node.js
* MongoDB

## Quick-start
1. Run `npm install`
2. Create a `config.js` file in `src/server/` and add your secret and database connection strings like this:

```
module.exports = {
  'secret' : 'mysecret',
  'database' : 'mongodb://localhost/myConnection'
 };
 ```
 3. Start mongodb server
 4. Run `npm start`
 5. Open a browser and navigate to `http://localhost:3000/api/setup`
 6. Navigate to `http://localhost:3000/`. You can log in using `myuser` and `password`
 
## Acknowledgments
* Chris Sevilleja - [scotch.io](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
* yusinto - [universal-hot-reload](https://github.com/yusinto/universal-hot-reload)
