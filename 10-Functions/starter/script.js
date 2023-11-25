'use strict';

// *****************************    Video 3    *****************************
/*
const bookings = [];

// ES6 way to using default value
const createBooking = function (
  flightNumber,
  numPassengers = 1,
  price = 199 * numPassengers // we can use the value of other parameters that set before it
) {
  // old way to using default values using short circuiting (ES5)
  // numPassengers = numPassengers || 1;
  // price ||= 199;

  // Enhanced object literal
  const booking = {
    flightNumber,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);

// if we dont want to set a parameter we can pass it undefined, because undefined means not setting it at all
// we use this way to skip a parameter and use the default value
createBooking('LH123', undefined, 1000);
*/

// *****************************    Video 4    *****************************
/*
const flight = 'LH234';
const sina = {
  name: 'Sina Asgari',
  passport: 5498722548,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
};

checkIn(flight, sina);

// flightNum is just a copy from original value (flight) because flight is a primitive data type. so by changing flightNum, the original value does not change
console.log(flight);

// when we pass a refrence type to a function, what is copyed is just the reference to the object in memory heap, so both point to the same object in memory heap
console.log(sina);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(sina);
console.log(sina.passport);
*/

// *****************************    Video 6    *****************************
/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  // functions also have properties
  console.log(`Transformed by: ${fn.name}`);
};

// passing function value, we don't call it
transformer('JavaScript is the best!', upperFirstWord);

transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);
*/

// *****************************    Video 7    *****************************
/*

// this works because of closure
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
greet('Hello')('Sina');

// one arrow function returning another arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hey')('Sina');
*/

// *****************************    Video 8    *****************************
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // enhanced object literal
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `flight: ${this.iataCode}${flightNum}`,
      name,
    });
  },
};

lufthansa.book(239, 'Sina Asgari');
lufthansa.book(635, 'John Smith');

console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// it is a regular function call and this keyword points to undefined (in restrict mode)
// this keyword depends on how a function called
// book(23, 'Sarah Williams'); // NOT work

// function is object and object can have methods
// how to tell javascript explicitely (or manually), this keyword should be?
// 1) Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

const swiss = {
  airline: 'Swiss  Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// 2) Aplly method (its just like call method, but it give an array as argmunet for function)
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// or better way
book.call(swiss, ...flightData);
console.log(swiss);
*/

// *****************************    Video 9    *****************************
// 3) Bind method
// bind does not emidiatly call the function, instead it returns a new function where the this keyword is bind (its set to a value we pass into bind)

/*

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // enhanced object literal
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `flight: ${this.iataCode}${flightNum}`,
      name,
    });
  },
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss  Air Lines',
  iataCode: 'LX',
  bookings: [],
};

const book = lufthansa.book;

// it return a function that this keyword is always bind to eurowings object
const bookEW = book.bind(eurowings);

// it return a function that this keyword is always bind to swiss object
const bookLX = book.bind(swiss);

// it return a function that this keyword is always bind to lufthansa object
const bookLH = book.bind(lufthansa);

bookEW(23, 'Steven Williams');

// in this case, the first parameter is always 23 (preset), and we just need parameter number 2
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonh Smith');
bookEW23('Marta Cooper');

// With Event Listeners
lufthansa.planes = 300;

lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// in event handlers, the this keyword is always the element that points to element that handler attached to
// in this case "lufthansa.buyPlane" attached to "document.querySelector('.buy')" element
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// the way to fix this is using bind method
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial Application (preset parameters)
const addTax = (rate, value) => value + rate * value;
// we set this keyword to null in Partial Application
const addVAT = addTax.bind(null, 0.23);
// how addVAT looks like
// addVat = value => value + value * 0.23;

console.log(addVAT(100));

// simulate bind method for addTax
const addTaxRate = function (rate) {
  return function (value) {
    return value + rate * value;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));

*/

// *****************************    Video 10    *****************************
// Code Challenge
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: c++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write Option Number)`
      )
    );
    if (
      typeof answer === 'number' &&
      answer >= 0 &&
      answer < this.answers.length
    )
      this.answers[answer] += 1;
    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are: ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS
const test = {
  answers: [5, 2, 3],
};

poll.displayResults.call(test);
poll.displayResults.call(test, 'string');
*/

// *****************************    Video 11    *****************************
// Immediately Invoked Function Expressions (IIFE)
// sometimes we need a function to execute just once and never again

/*
// nothing stops us to call below function again and again
const runOnce = function () {
  console.log('This will never call again!');
};

runOnce();

// accuall way to create IIFE function
// wrap a unnamed function to paranteses and call it immediately
(function () {
  console.log('This will never call again!');
  // this variable is encapsulated in this function scope and global scope doesn't have access to it
  const isPrivate = 23;
})();

// arrow function version
(() => console.log('This will ALSO never call again!'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
console.log(notPrivate);
console.log(isPrivate);
*/

// *****************************    Video 12    *****************************
// Closures
/*

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);
*/

// *****************************    Video 13    *****************************
/*
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f); // clossure here is g

// Re-assigning f function
h();
f();

console.dir(f); // clossure here is g

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will Start boarding in ${wait} seconds`);
};

// Closure has priority to scope chain
const perGroup = 1000;
boardPassengers(180, 3);
*/

// *****************************    Video 14    *****************************
// coding challenge

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
