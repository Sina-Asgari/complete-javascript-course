'use strict';

// **********************    VIDEO 7   **********************
/*
function calcAge(birthYear) {
  const age = 2023 - birthYear;
  // using lookup to find this varibale in global variables using chain scope
  // console.log(firstName);

  function printAge() {
    // 'age' and 'birthYear' are in parent scope (calcAge function)
    // also firstName are in the global scope
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
  }
  printAge();
  // const is a block scope so we don't have access to 'str' variable
  // console.log(str);

  // but var is not block scope and is function scope so we have access to millenial scope and have access to this variable in whole function scope (we should not use this kind of variable)
  // console.log(millenial);

  // functions are also block scope so we don't have access to 'add function here, but it's true only in strict mode, and if dont use this mode we have access to it
  // console.log(add(2, 3));
  return age;
}

// fistName is in the global scope
const firstName = 'Sina';
calcAge(1996);

// we don't have access to child scope (in this case in calcAge scope)
// console.log(age);
// printAge();

// child scopes can manipulate variables of parnet scope
*/

// **********************    VIDEO 9   **********************

// Variables
/*
console.log(me); // undefined
console.log(job); // ReferenceError: Cannot access 'job' before initialization (Inside TDZ)
console.log(year); // ReferenceError: Cannot access 'year' before initialization (Inside TDZ)

var me = 'sina'; // hoisted to value undefined
let job = 'web developer';
const year = 1997;
*/

// Functions
/*
console.log(addDecl(2, 3)); // works just fine
// Just like variable two below functions are in TDZ
console.log(addExper(2, 3)); // ReferenceError: Cannot access 'addExper' before initialization
console.log(addArrow(2, 3)); // ReferenceError: Cannot access 'addExper' before initialization

function addDecl(a, b) {
  return a + b;
}

const addExper = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// if we change this to var we get another type of error
// any variable that declared with var will be hoisted and set to undefined
// its equvalent to undefined(2, 3)
console.log(addExper(2, 3)); // TypeError: addExper is not a function
var addExper = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// the below if condition will be true not because numProducts is equal to 0 but because it is undefined and also to falsy value because how hoisting works with var values
if (!numProducts) deleteAllProducts();

// nerver use var
// with respect to CLEAN CODE always declare variables on top of each scope
var numProducts = 10;

// always first declare functions and then use them
function deleteAllProducts() {
  console.log('All Products deleted');
}


var x = 1; // this will create a new property in window object (window object is a global object)
let y = 2; // this would not create a new property in window object
const z = 3; // this would not create new a property in window object

console.log(x === window.x); // ouput = true
console.log(y === window.y); // ouput = false
console.log(z === window.z); // ouput = false
*/

// **********************    VIDEO 11   **********************
/*
console.log(this); // this in global scope is window object


// function declaration
const calcAge = function (birthYear) {
  console.log(2023 - birthYear);
  console.log(this);
};
// in regular function call, this will be undefined (in strict mode)
// in regular function call, this will be window object (wihtout strict mode)
calcAge(1997);


// arrow function
const calcAge = birthYear => {
  console.log(2023 - birthYear);
  console.log(this);
};
// arrow function dose not get its own this keyword and use lexical this keyword (use this keyword of parent function or parnet scope)
// in this case this will be window object (parent is global scope so this will be window object)
calcAge(1997);


const sina = {
  year: 1997,
  calcAge: function (birthYear) {
    // this will be sina object (because sina object call calcAge method, sina.calcAge();)
    // if matilda call this function then this will be matilda object, matilda.calcAge();
    // this is NOT static and is dynamic based on who called it
    console.log(this);
    console.log(2023 - this.year);
  },
};

sina.calcAge();

const matilda = {
  year: 2017,
};

// method borrowing
matilda.calcAge = sina.calcAge;
matilda.calcAge();

// this will throw error, becuse its regular function call and dose not have owner and this will be undefined
const f = sina.calcAge;
f();
*/

// **********************    VIDEO 12   **********************
/*
// if here define firstName with var, because var create a property on window, sina.greet() arrow function will work with var variable value
// var firstName = 'Matilda';

const sina = {
  firstName: 'sina',
  year: 1997,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);

    // const isMillenial = function () {
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };
    // below calling function will throw error because it's regular function call and do not have this keyword, (this = undefined)
    // isMillenial();

    // the way to fix this:

    // Solution 1) define another variable called self outside the function and put value this to it and rewrite function (old way solution):
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillenial();

    // Solution 2) use arrow function (modern solution)
    // arrow function does not have this keyword so use parent this, in this case calcAge function this keyword
    const isMillenial = () =>
      console.log(this.year >= 1981 && this.year <= 1996);

    isMillenial();
  },
  // arrow function dose not have own this keyword and use parent this keyword and parnet here is global scope (window object) so firstName is undefined
  // here object definition dose not create a scope. so this is not a code block and is object literal (literaly defining an object)
  // TAKE AWAY: should never ever use arrow function as method (always use function expersion)
  // greet: () => console.log(`Hey ${this.firstName}!`), // equvalent to = ${window.firstName}

  // the way to fix greet function: use function expersion
  greet: function () {
    console.log(`Hey ${this.firstName}!`);
  },
};

sina.greet();
sina.calcAge();
// if we want to access to a property of an object that dose not exists it does not give error but return undefined
// console.log(window.firstName); // print undefined

// arguments keyword
// arguments keyword is only accessible in regular function and not arrow function
// its not important in modern javascript because there is modern way to deal with multiple parameters
const addExper = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExper(2, 3);
// using arguments keyword to specify more argmunets
addExper(2, 3, 5, 8);

const addArrow = (a, b) => {
  // ReferenceError: arguments is not defined at addArrow
  console.log(arguments);
  return a + b;
};

addArrow(2, 3);
*/

// **********************    VIDEO 13   **********************
/*
// PRIMITIVES
let age = 26;
let oldAge = age;
age = 27;
console.log(age, oldAge);

// OBJECTS;
const me = {
  name: 'sina',
  age: 26,
};

// copy the object
const friend = me;
friend.age = 30;
// both ages changed!
console.log(friend.age, me.age);
*/

// **********************    VIDEO 14   **********************
/*

// works fine for primitive types
let lastName = 'williams';
let oldLastName = lastName;

lastName = 'Devis';
console.log(lastName, oldLastName);


const jessica = {
  firstName: 'jessica',
  lastName: 'williams',
  age: 27,
};

// just copying the reference and point to the same object
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
// now both lastName is Devis
console.log('before marriage', jessica);
console.log('after marriage', marriedJessica);

// not allowed because it is const and we can not change the value in stack
// marriedJessica = {};


// how to acullay copy the objects?
const jessica = {
  firstName: 'jessica',
  lastName: 'williams',
  age: 27,
};

// Object.assign will merge two objects and return a new object
// a new object created in the heap and jessicaCopy is now pointing to it
const jessicaCopy = Object.assign({}, jessica);
jessicaCopy.lastName = 'Devis';
console.log(jessica);
console.log(jessicaCopy);

// problem: this trick is only works for first level, if we have object inside the object then this inner object still point to the same memory (shallow copy)
const jessica2 = {
  firstName: 'jessica',
  lastName: 'williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy2 = Object.assign({}, jessica2);
jessicaCopy2.lastName = 'Devis';

// both objects family will be changed
jessicaCopy2.family.push('Mary', 'John');

console.log(jessica2);
console.log(jessicaCopy2);
*/
