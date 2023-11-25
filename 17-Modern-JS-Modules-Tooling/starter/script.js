// **************************     Video 05     **************************

// Importing module
import {
  addToCart,
  totalPrice as price, // change the name of exported variable
  tq,
} from './shoppingCart.js';

addToCart('apple', 5);
console.log(price, tq);

console.log('Importing module');

// import all the exports of a module at the same time in an object
// its like exporting a public api just like a class
import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('apple', 5);
console.log(ShoppingCart.totalPrice);

////// import default export. in this case we give every name we want. for example in this case "add"
import add from './shoppingCart.js';
add('bread', 5);

///// combining named and default export in one statement
// import add2, { addToCart, tq } from './shoppingCart.js';

// **************************     Video 06     **************************
// Top Level await [ES2022] (use await keyword outside of an async function, it works only in modules)
// it blocks the execution of entire module!!

/*
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();

console.log(data);
console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); // it return promise and not what we specified in return statement

// get accuall return we specified in return statment
lastPost.then(data => console.log(data));
// but this solution is not very clean. better way is using top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);

// if a module import a module which has a top-level await then the importing module will wait for imported module to finish the blocking code

*/

// **************************     Video 07     **************************
// Module Pattern

/*
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${product} ${quantity} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${product} ${quantity} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// all of this works because of "clouser"
ShoppingCart2.addToCart('apple', 5);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // undefined
*/

// **************************     Video 07     **************************
// commonJS Modules

/*
///// Export
// it would not work in browser but it will work in nodejs
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product} ${quantity} added to cart`);
};

///// Import
const { addToCart } = require('./shoppingCart.js');

*/

// **************************     Video 10     **************************

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    {
      product: 'break',
      quantity: 5,
    },
    {
      product: 'pizza',
      quantity: 5,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone); // changed
console.log(stateDeepClone); // not changed

// **************************     Video 11     **************************
/*

* install parcel:

npm install parcel --save-dev

------------------------------------

* first way: 

npx parcel index.html

* second way:

1. change package.json like this:
"scripts": {
  "start": "parcel index.html"
},

2. npm run start

------------------------------------

* build final bundle:

"scripts": {
  "start": "parcel index.html",
  "build": "parcel build index.html"
},

npm run build
------------------------------------
*/

if (module.hot) {
  module.hot.accept();
}

/*
* Polyfilling

import 'core-js/stable';

// polyfilling async function
import 'regenerator-runtime/runtime';

*/
