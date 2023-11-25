// Exporting module
console.log('Exporting module');

/*
// Blocing code
console.log('Start fetching users');
// this await not only block this module also all other modules that importing this
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching users');
*/

const shippingCost = 10;
const cart = [];

// named exports. always have to be in top-level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// named exports. export multiple things in the same time
export { totalPrice, totalQuantity as tq };

////// Export Default: usually used for exporting one thing per module
// we export value and not variable. for example if we want to export addToCart function:
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
