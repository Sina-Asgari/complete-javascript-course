'use strict';

// Data needed for first part of the section
// object literals

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // passing an object to the function and destructuring it inside arguments part of the function
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// ********************************     VIDEO 3   ********************************
/*
// Destructuring arrays (using [])

const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a, b, c);

// we can only take just 2 first elements
const [first, second] = restaurant.categories;
console.log(first, second);

// take first and third elements and skip second element
const [first, , third] = restaurant.categories;
console.log(first, third);


// switching variables
let [main, , secondary] = restaurant.categories;

// old way
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

// modern way with destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Recive 2 return values from a function
const [starter, main1] = restaurant.order(1, 1);
console.log(starter, main1);

// destructuring nested arrays
const nested = [2, 4, [5, 6]];
const [first, second, [firstNested, secondNested]] = nested;
console.log(first, second, firstNested, secondNested);

// Defualt values
const [a, b, c] = [8, 9];
console.log(a, b, c); // ouput: 8 9 undefined

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // ouput: 8 9 1
*/

// ********************************     VIDEO 4   ********************************
/*
// Destructuring objects (using {})
// it suould excatly match the object properties names
// as order of properties doesn't matter, we dont need manuly skip the elements we don't want
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// if we want variable names be different from property names
// syntax: propertyName: newName
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default Values
// objectPropertyName: newName = defaultValue
// if we don't set the default value we get undefined for unavailable properties
const { menu = [], starterMenu: starter = [] } = restaurant;
console.log(menu, starter);

// mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// SyntaxError: Unexpected token '='
// { a, b } = obj;
// how to solve it: put inside ()
({ a, b } = obj);
console.log(a, b);

// nested objects
const { name, openingHours, categories } = restaurant;
// const { fri } = openingHours;
// console.log(fri);

// further destructuring
// const {
  //   fri: { open, close },
  // } = openingHours;
  // console.log(open, close);
  
  // further destructuring and renameing variables
  const {
    fri: { open: o, close: c },
  } = openingHours;
  console.log(o, c);
  
  // passing object to function (1 argument against 4 argument and destructuring it immediately)
  // pros: order doesn't matter
  restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex: 2,
    starterIndex: 3,
  });
  
  // use default value for time and mainIndex
  restaurant.orderDelivery({ address: 'Via del Sole, 21', starterIndex: 1 });
*/

// ********************************     VIDEO 5   ********************************
// spread operator (unpack an array) - actually it works on all iterables
// iterables: arrays, strings, sets, maps, NOT objects
// IMPORTANT: we only can use spread operator when building an array or when passing values to function (places where we need pass values separated by commas)
/*
const arr = [7, 8, 9];
const newArray = [1, 2, ...arr];
console.log(newArray); // [1, 2, 7, 8, 9] (it is one value and it is array)
console.log(...newArray); // 1 2 7 8 9 (5 values and they are numbers)

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array (shallow copy)
const mainMenuArray = [...restaurant.mainMenu];

// join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Spread operator on strings
const str = 'Sina';
const letters = [...str, 'x', 'y', 'z'];
console.log(letters);

// IMPORTANT: we only can use spread operator when building an array or when passing values to function (places where we need pass values separated by commas)
console.log(...str); // here is fine
// console.log(`${...str} asgari`); // SyntaxError: Unexpected token '...'


// real world example
const ingredients = [prompt('ing1'), prompt('ing2'), prompt('ing3')];
restaurant.orderPasta(...ingredients);

// Objects (since ES2018)
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant }; // Shallow copy
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name, restaurant.name);
*/

// ********************************     VIDEO 6     ********************************
// Rest pattern and Rest operator (do the oposit of spread operator)
// this operator collect multiple elements and give it as an array (pack elements to an array)
/*

// 1) Destructuring

// SPREAD, because on RIGHT side of equal sign
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of equal sign
// REST operator must be the last element
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...otherObjects } = restaurant.openingHours;
console.log(sat, otherObjects);

// 2) Functions
// rest parameters
// get multiple values and pack them all to one an array
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum;
};

console.log(add(2, 3));
console.log(add(5, 3, 7, 2));

// using spread operator and rest parameter (unpack and pack)
const x = [23, 5, 7];
console.log(add(...x));

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/

// ********************************     VIDEO 7     ********************************
// short-circuiting
/*
// Use ANY data type, return ANY data type, short-circuiting (short circuite evaluation)

// 1) OR operator ||
// in the case of or operator, short-circuiting means that if the first value is truthy value it will immeditly return first value (other operand would not be evaluated)
console.log(3 || 'Sina'); // ouput: 3
console.log('' || 'Sina'); // ouput: 'Sina'
console.log(true || 0); // ouput: true
console.log(undefined || null); // ouput: null

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // ouput: 'Hello (first truthy value)

// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
// or another way:
const guests2 = restaurant.numGuests || 10; // undefined || 10
console.log(guests2);

// 2) AND operator &&
// short-circuiting in case of and operator will means it will return false when it see the first falsy value and other operand will not be evaluated
console.log(0 && 'Sina'); // ouput: 0
console.log(7 && 'Sina'); // ouput: 'Sina'
console.log('Hello' && 23 && 0 & 'Sina'); // ouput: 0

// Practical example

// if function exists
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// or another way:
// prons: shorter way
// cons: hard to read
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/

// ********************************     VIDEO 8     ********************************
// nullish coalescing operator (ES2020)
/*

// number of restaurant guests is accutally 0
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); //output: 10 (wrong answer)

// nullish: null and undefined (NOT 0 or '')
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect); //output: 0 (correct answer)
*/

// ********************************     VIDEO 9     ********************************
//
/*

// 1) OR assignment operator
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// OR assignment operator
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;

console.log(rest1);
console.log(rest2);



// 2) nullish assignment operator
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// nullish assignment operator (nullish: null , undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

console.log(rest1);
console.log(rest2);

// 3) AND assignment operator
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

rest1.owner &&= '<Annonymous>';
rest2.owner &&= '<Annonymous>';

console.log(rest1);
console.log(rest2);
*/

// ********************************     VIDEO 10     ********************************
// Codeing Challenge
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Devies',
      'kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4.0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  // 6)
  printGoals: function (...players) {
    for (let i = 0; i < players.length; i++) {
      let numScored = 0;
      for (let j = 0; j < this.scored.length; j++) {
        if (players[i] === this.scored[j]) numScored++;
      }
      console.log(`Player: ${players[i]}, Goles: ${numScored}`);
    }
  },
};

// 1)
const [players1, players2] = game.players;
// console.log(players1);
// console.log(players2);

// 2)
const [gk, ...fieldPlayers] = players1;
// console.log(gk);
// console.log(fieldPlayers);

// 3)
const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// 4)
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// 5)
const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2)

// 6)
game.printGoals('Lewandowski', 'Gnarby', 'Burki');

// 7)
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
*/

// ********************************     VIDEO 11     ********************************
/*
// 'for of' loop, we can still use continue and break keywords

// just get the item and not the index
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
for (const food of menu) {
  console.log(food);
}

// get both item and index
for (const [index, item] of menu.entries()) {
  console.log(index, item);
}

// console.log([...menu.entries]);
*/

// ********************************     VIDEO 12     ********************************
// Enhanced object literals
/*
// 3) we can compute property name instead of write them manully and literaly
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  // 3) new way using computed property name
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  // 3) new way using computed property name
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // old way
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // 1) Before ES6 (property name and variable name is same and must be written)
  // openingHours: openingHours,
  // In ES6 we can just add property name and don't need same variable name
  openingHours,

  // 2) in ES6 enhanced object literals we can write function like below
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // passing an object to the function and destructuring it inside arguments part of the function
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

console.log(restaurant);
*/

// ********************************     VIDEO 13     ********************************
// optinal chaining
/*

// Objects
console.log(restaurant.openingHours.mon); // ouput: undefined
// console.log(restaurant.openingHours.mon.open); // output: TypeError: Cannot read properties of undefined (reading 'open')
// because restaurant.openingHours.mon is undefined then we can not read open property from it for avoid above error with have to first check 'restaurant.openingHours.mon' exists or not:
if (restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
// above check is for just one property what if we have dozens of this properties?
// what if we don't no if 'restaurant.openingHours' exists too? so we have to check it first to
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

// Solution: in ES2020 a feature introduce name optional chaining
// with optional chaining if certain property does not exists then undefined will return immediatlly then it will avoid that kind of error we saw earlier

// WITH optional chaining (?.)
console.log(restaurant.openingHours.mon?.open);
// if property before ?. exists(exists means: it's not null or undefined) (in this case "restaurant.openingHours.mon") then open property will read from there otherwise undifined will immeditlly returned

// we can have multiple optional chaining
console.log(restaurant.openingHours?.mon?.open);

// Example
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of weekdays) {
  const open = restaurant.openingHours[day]?.open ?? 'Closed';
  console.log(`On ${day}, we open at ${open}`);
}


// Methods (check if a method exists before call it)
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');


// Arrays (check if an array is empty)
const users = [
  {
    name: 'Sina',
    email: 'sina@gmail.com',
  },
];

// if users[0] exists, read name property
console.log(users[0]?.name ?? 'user does not exists');

console.log(users[1]?.name ?? 'user does not exists');
*/

// ********************************     VIDEO 14     ********************************
// looping objects
/*
const openingHours = restaurant.openingHours;

// looping over property names (keys)
const properties = Object.keys(openingHours); // return an array of keys
let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}

console.log(openStr);

// looping over property values
const values = Object.values(openingHours); // return an array of values
console.log(values);

for (const value of values) {
  console.log(value);
}

// looping over entire object (names and values)
for (const [key, value] of Object.entries(openingHours)) {
  console.log(key, value);
}

// destructuring value
for (const [key, { open, close }] of Object.entries(openingHours)) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

// ********************************     VIDEO 15     ********************************
// Coding challenge
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1)
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

// 2)
let sumOdd = 0;
for (const odd of Object.values(game.odds)) {
  sumOdd += odd;
}
console.log(sumOdd / Object.values(game.odds).length);

// 3)
for (const [teamName, odd] of Object.entries(game.odds)) {
  console.log(`Odd of victory ${game[teamName] ?? 'Draw'}: ${odd}`);
}

// BONUS
const scores = {};
for (const player of game.scored) {
  scores[player] = scores[player] ? scores[player] + 1 : 1;
}
console.log(scores);
*/

// ********************************     VIDEO 16     ********************************
// Sets Data Structure: it contains unique elements and order is not matter
// syntax: new Set(iterable)
/*
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);

console.log(new Set('Sina'));

// size of the set
console.log(ordersSet.size);

// if an element exists in the set
console.log(ordersSet.has('Pasta'));
console.log(ordersSet.has('Bread'));

// add new element to set
ordersSet.add('Garlic Bread');

// delete an element from set
ordersSet.delete('Pizza');
console.log(ordersSet);

// delete all of the elements
ordersSet.clear();

// there is no index in sets. so below code return undefined
// ordersSet[0];

// there is no way to retrive data from a SET, we acctullay do not need it, it is enough to know if an element exists in set or not

// iterate over sets
for (const order of ordersSet) {
  console.log(order);
}

// Example (remove duplicate values from an array)
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = new Set(staff);
console.log(staffUnique);

// Spread operator also work on sets beacuse sets are iterable
console.log(...staffUnique);

// convert set to array
console.log(new Array(...staffUnique));
console.log([...staffUnique]);

// how many letters are in as string
console.log(new Set('sinaasgari'), new Set('sinaasgari').size);
*/

// ********************************     VIDEO 17     ********************************
// Maps Data Structure (it's alot more uesful than Sets)
// map values to keys, just like objects, data stored as key value pairs in maps, in maps keys can be any type (can be object, array or another map), but in objects keys are always strings

/*
const rest = new Map();
// add new key value pair to map, map.set(key, value)
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
// set method also return the updated map that allows us to chain set methods
console.log(rest.set(2, 'Lisbon, Portuga;'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open: D')
  .set(false, 'We are closed :(');

console.log(rest);

// to get value we use get method
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// check if map contains certain key
console.log(rest.has('categories'));

// delete from map based on key
rest.delete(2);
console.log(rest);

// size property
console.log(rest.size);

// remove all the elements
// rest.clear();

// array as key in map
rest.set([1, 2], 'Test');
console.log(rest.get([1, 2])); // output: undefined (because array in set method are different from array in get method, they store in different places in heap)

// way to fix this:
const arr = [3, 4];
rest.set(arr, 'Test2');
console.log(rest.get(arr)); // output: [3, 4]

// use DOM element as key in map
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
*/

// ********************************     VIDEO 18     ********************************
// pass an array to Map constructor. so that array itself containse multiple arrays, that first element of array is key and second element is value
/*
// an array of arrays
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['Correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);

console.log(question);

// Object.entries() also return an array of arrays
const openingHours = restaurant.openingHours;
console.log(Object.entries(openingHours));

// convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Maps are iterable so we can loop over them
for (const [key, value] of question) {
  console.log(key, value);
}

// Quiz App
console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(key, value);
}

const answer = Number(prompt('Your answer: '));
console.log(question.get(question.get('Correct') === answer));

// Convert map to array (array of arrays) using spread operator
console.log([...question]);

// entries(), keys(), values() methods on Maps.
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);
*/

// ********************************     VIDEO 20     ********************************
// coding challenge
/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1)
// get values from map:
const mapIterValues = gameEvents.values();
// remove duplicated by makeing them Set
const setValues = new Set(mapIterValues);
// convert set to list
const listValues = [...setValues];

console.log(listValues);

// 2)
gameEvents.delete(64);
console.log(gameEvents);

// 3)
console.log(
  `"An event happened, on average, every ${90 / gameEvents.size} minutes"`
);

const timesList = [...gameEvents.keys()];
console.log(timesList[timesList.length - 1]);

// or using pop method
const time = [...gameEvents.keys()].pop();
console.log(time);

// more accurate message
console.log(
  `"An event happened, on average, every ${time / gameEvents.size} minutes"`
);

// 4)
for (const [time, event] of gameEvents) {
  const half = time >= 45 ? '[SECONDE HALF]' : '[FIRST HALF]';
  console.log(`${half} ${time}: ${event}`);
}
*/

// ********************************     VIDEO 21     ********************************
// Strings - part 1
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

// use index for get a letter from a string
console.log(plane[0]);
console.log('B737'[0]);

// get the length of a string
console.log(airline.length);

// index of a letter from string (first occurance)
console.log(airline.indexOf('r'));

// index of a letter from string (last occurance)
console.log(airline.lastIndexOf('r'));

// index of a word
console.log(airline.indexOf('Portugal')); // output: 8

// it is case sensetive
console.log(airline.indexOf('portugal')); // output: -1

// slice method (get start index for extracting substring)
// we can not mutate strings because there are primitives. so this method and similar methods always return new strings
console.log(airline.slice(4)); // output: Air Portugal

// start and end index [start, end) - not include end index
console.log(airline.slice(4, 7)); // output: Air

// extract first word
console.log(airline.slice(0, airline.indexOf(' ')));

// extract last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// we can use negative index to start counting from the end
console.log(airline.slice(-8)); // output: Portugal

const checkMiddleSeat = function (seat) {
  //  B and E are middle seats
  // take the last charecter
  const lastCharecter = seat.slice(-1);
  return lastCharecter === 'B' || lastCharecter === 'E';
};

console.log(checkMiddleSeat('11B'));
console.log(checkMiddleSeat('23C'));
console.log(checkMiddleSeat('3E'));

// when we call a method on string, JS convert that string to object string with that value so we can say bellow code executed:
console.log(new String('Sina'));
console.log(typeof new String('Sina')); // output: object
*/

// ********************************     VIDEO 22     ********************************
// Strings - part 2
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix captilization in name
const passenger = 'jOnAs'; // should be Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect);

// comparing emails
const email = 'sina@gmail.com';
const loginEmail = '  Sina@Gmail.Com \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

// Doing all in one step
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

console.log(normalizedEmail === email);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to barding door 23, Boarding door 23!';

// it only replace the first occurance (replace are also case sensetive)
console.log(announcement.replace('door', 'gate'));

// use replaceAll instead
console.log(announcement.replaceAll('door', 'gate'));

// alternative way (using reqular experssion)
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane1 = 'Airbus A320neo';

console.log(plane1.includes('A320')); // output: true
console.log(plane1.includes('Boeing')); // output: false

console.log(plane1.startsWith('Air')); // output: false

if (plane1.startsWith('Airbus') && plane1.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('gun') || baggage.includes('knife')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('socks and camera');
checkBaggage('Got some snacks and a gun for protection');
*/

// ********************************     VIDEO 23     ********************************
// Strings - part 3

/*

// split method
console.log('a+very+nice+string'.split('+')); // output: ['a', 'very', 'nice', 'string']
console.log('Sina Asgari'.split(' ')); // output: ['Sina', 'Asgari']

// using destructuring and split method
const [firstName, lastName] = 'Sina Asgari'.split(' ');
console.log(firstName, lastName);

// join method
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));

    // alternative way:
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('sina asgari');

// padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+')); // output: +++++++++Go to gate 23!

console.log(message.padStart(25, '+').padEnd(35, '+')); // output: +++++++++++Go to gate 23!++++++++++

const maskCreditCard = function (number) {
  // const str = String(number);

  // alternative way to convert a number to string:
  const str = number + '';

  console.log(str.slice(-4).padStart(str.length, '*'));
};

maskCreditCard(64647384); // output: ***7384
maskCreditCard('433784638646454817384'); // output: *****************7384

// repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

*/

// ********************************     VIDEO 24     ********************************
// coding challenge
/*

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, str] of rows.entries()) {
    let [first, last] = str.toLowerCase().trim().split('_');
    last = last.replace(last[0], last[0].toUpperCase());
    const firstPart = [first, last].join('');

    console.log(`${firstPart.padEnd(20, ' ')} ${'✅'.repeat(i + 1)}`);
  }
});

*/

// ********************************     VIDEO 25     ********************************
// coding challenge
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const f = function (str) {
  const flights = str.split('+');
  for (const flight of flights) {
    let [type, src, dest, time] = flight.split(';');
    type = type.slice(1).replace('_', ' ');
    src = src.slice(0, 3).toUpperCase();
    dest = dest.slice(0, 3).toUpperCase();
    time = time.replace(':', 'h');

    if (type.startsWith('Delayed')) {
      type = '🔴 ' + type;
    }
    const message = `${type} from ${src} to ${dest} (${time})`;
    console.log(`${message.padStart(45)}`);
  }
};

f(flights);
