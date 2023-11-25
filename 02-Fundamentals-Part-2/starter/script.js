"use strict";

// ***************   Video 4   ***************
/*
// function is value in javascript

// function delraction
// can call before delating it
function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1991);
console.log(age1);



// function expersion
// can not call before declaring it
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age2 = calcAge2(1991);
console.log(age2);
*/

// ***************   Video 5   ***************
/*
// arrow function
// special type of expersion function
// we can igone curly braces {} and return keyword and if we have only one line statement
// also igoner () around parameters if we have only one parameter
// arrow functions do not get 'this' keyword
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirment = (birthYear) => {
  const age = 2037 - birthYear;
  const retierment = 65 - age;
  return retierment;
};

const retierment = yearsUntilRetirment(1991);
console.log(retierment);

const yearsUntilRetirment2 = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  return `${firstName} retires in ${65 - age} years`;
};

console.log(yearsUntilRetirment2(1991, "Sina"));
console.log("ZAN");
*/

// ***************   Video 6   ***************
/*
function cutFruitPices(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applesPices = cutFruitPices(apples);
  const orangePices = cutFruitPices(oranges);
  return `Juice with ${applesPices} apples and ${orangePices} oranges.`;
}

console.log(fruitProcessor(5, 2));
*/

// ***************   Video 8   ***************
// coding challenge
/*
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const checkWinner = function (avgDolpins, avgKoalas) {
  if (avgDolpins >= 2 * avgKoalas) {
    console.log(`Dolphins team wins (${avgDolpins} vs ${avgKoalas})`);
  } else if (avgDolpins * 2 <= avgKoalas) {
    console.log(`Koalas team wins (${avgKoalas} vs ${avgDolpins})`);
  } else {
    console.log("Draw");
  }
};

const avgDolpins = calcAverage(44, 23, 71);
const avgKoalas = calcAverage(65, 54, 49);
console.log(avgDolpins, avgKoalas);
checkWinner(avgDolpins, avgKoalas);
*/

// ***************   Video 9   ***************
/*
// literas syntacs
const friends = ["Sobhan", "Mr.Mohsen", "yashar"];
console.log(friends);

const years = new Array(1994, 2008, 1997, "years");
console.log(years);

console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

// only primitives values are imuteable and array is not primitive
friends[2] = "Mehdi";
console.log(friends);

// we can not change const arrays totaly. below code not allowed
// friends = ["Bob", "Alice"];
*/

// ***************   Video 10   ***************
/*
// add new element to the end of the array
const friends = ["Sobhan", "Mr.Mohsen", "yashar"];
const newLength = friends.push("Mehdi");
console.log(friends, newLength);

// add new element to the beginng of the array
friends.unshift("Sina");
console.log(friends);

// remove elements
const lastElement = friends.pop();
console.log(lastElement);
console.log(friends);

const fristElement = friends.shift();
console.log(fristElement);

// find index of a element
console.log(friends.indexOf("Sobhan"));
console.log(friends.indexOf("Bob"));

// ture if exists, false if not
console.log(friends.includes("bob"));
console.log(friends.includes("Sobhan"));

// includes check with strict check
friends.push(12);
console.log(friends.includes("12")); // answer is false

if (friends.includes("Sobhan")) {
  console.log("Sobhan is my frind");
} else {
  console.log("sobhan is not my friend");
}
*/

// ***************   Video 11   ***************
/* 
// code challenge

const calcTip = function (bill) {
  if (50 <= bill && bill <= 300) return bill * 0.15;
  else return bill * 0.2;
};

const calcTip2 = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const calcTip3 = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44]; // const bills = new Array(125, 555, 44);
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [
  bills[0] + calcTip(bills[0]),
  bills[1] + calcTip(bills[1]),
  bills[2] + calcTip(bills[2]),
];

console.log(bills);
console.log(tips);
console.log(totals);

const bills2 = [125, 555, 44]; // const bills = new Array(125, 555, 44);
const tips2 = [calcTip2(bills2[0]), calcTip2(bills2[1]), calcTip2(bills2[2])];
const totals2 = [
  bills[0] + calcTip2(bills[0]),
  bills[1] + calcTip2(bills[1]),
  bills[2] + calcTip2(bills[2]),
];

console.log(bills2);
console.log(tips2);
console.log(totals2);

// below code wont work because each array will convert to string and concatenate them
// const totals = bills + totals;
*/

// ***************   Video 12   ***************
/*
// objects (key, value) pairs (object literal syntax)
// each one is property
// order is not important to retirve data
// array is useful for order data and objects for unstracured data
const sina = {
  firstName: "Sina",
  lastName: "Asgari",
  age: 26,
  job: "front-end developer",
  firends: ["Sobahn", "Mohsen", "Yashar", "Sina", "Mehdi", "Mamad"],
};
*/

// ***************   Video 13   ***************
/*
const sina = {
  firstName: "Sina",
  lastName: "Asgari",
  age: 26,
  job: "front-end developer",
  firends: ["Sobahn", "Mohsen", "Yashar", "Sina", "Mehdi", "Mamad"],
};
// console.log(sina);
// using dot operator
console.log(sina.lastName);

// using bracket notation
// we can add any expersion we like (we can compute from any expersion)
console.log(sina["lastName"]);
const nameKey = "Name";

// we can compute from expersion
console.log(sina["first" + nameKey]);
console.log(sina["last" + nameKey]);

// below code wont work in dot notation
// sina."first" + nameKey;

const intersetedIn = prompt("What do you want to know about sina?");
console.log(intersetedIn);
console.log(sina[intersetedIn]);

if (sina[intersetedIn]) {
  console.log(sina[intersetedIn]);
} else {
  console.log("invalid option");
}

// add new property
sina.location = "LA";
sina["twitter"] = "@SinaAsgari";

console.log(sina);

console.log(
  `${sina.firstName} has ${sina.firends.length} frineds and his best firend is ${sina.firends[0]}`
);
*/

// ***************   Video 14   ***************
/*
// function is another type of value
const sina = {
  firstName: "Sina",
  lastName: "Asgari",
  birthYear: 1997,
  job: "front-end developer",
  firends: ["Sobahn", "Mohsen", "Yashar", "Sina", "Mehdi", "Mamad"],
  hasDriverLicense: true,
  // using function value for value part of key value pair

  // 1) not using 'this' keywork
  // calcAge: function (birthYear) {
  //   return 2023 - birthYear;
  // },

  // 2) using 'this' keywork
  // calcAge: function () {
  //   // we can use 'sina' instead of 'this' keywork but acording to the DRY principle (dont repeat yourself) if we change object name we have to change here also
  //   // return 2023 - sina.birthYear
  //   return 2023 - this.birthYear;
  // },

  // 3) compute once and use many times (most efficient solution)
  calcAge: function () {
    // create new property inside function
    this.age = 2023 - this.birthYear;
    return this.age;
  },

  summary: function () {
    return `${this.firstName} is a ${this.calcAge()} year old ${
      this.job
    } and he has ${this.hasDriverLicense ? "a" : "no"} driver's license.`;
  },
};

// 1) not using 'this' keywork
// console.log(sina.calcAge(sina.birthYear));
// console.log(sina["calcAge"](sina.birthYear));

// 2) using 'this' keyword
// console.log(sina.calcAge());
// console.log(sina["calcAge"]());

// 3)
// console.log(sina.calcAge());
// console.log(sina.age);

console.log(sina.summary());
sina.hasDriverLicense = false;
console.log(sina.summary());
*/

// ***************   Video 15   ***************
// coding challenge
/*
const Mark = {
  fullName: "Makr Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const John = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

if (John.BMI > Mark.BMI) {
  console.log(
    `${John.fullName}'s BMI (${John.calcBMI()}) is higer than ${
      Mark.fullName
    }'s (${Mark.calcBMI()})`
  );
} else {
  console.log(
    ` ${Mark.fullName}'s BMI (${Mark.calcBMI()}) is higer than ${
      John.fullName
    }'s (${John.calcBMI()})`
  );
}
*/

// ***************   Video 16   ***************
/*
for (let rep = 1; rep <= 10; rep++)
console.log(`Lifting weights repetions ${rep} 🏋️`);
*/

// ***************   Video 17   ***************
/*
const sina = [
  "Sina",
  "Asgari",
  2023 - 1997,
  "front-end developer",
  ["Sobhan", "Mohsen", "Yashar"],
  true,
];

const typesOfVariables = [];
for (let index = 0; index < sina.length; index++) {
  // typesOfVariables.push(typeof sina[index]);
  // or below code (this one is cleaner)
  typesOfVariables[index] = typeof sina[index];

  console.log(sina[index], typeof sina[index]);
}

console.log(typesOfVariables);

const years = [1991, 2007, 1969, 2020];
const ages = [];

const calcAge = function (year) {
  return 2023 - year;
};

for (let i = 0; i < years.length; i++) {
  ages.push(calcAge(years[i]));
}

console.log(ages);

for (let index = 0; index < sina.length; index++) {
  if (typeof sina[index] !== "string") continue;

  console.log(sina[index], typeof sina[index]);
}

for (let index = 0; index < sina.length; index++) {
  if (typeof sina[index] === "number") break;

  console.log(sina[index], typeof sina[index]);
}
*/

// ***************   Video 18   ***************
/*
const sina = [
  "Sina",
  "Asgari",
  2023 - 1997,
  "front-end developer",
  ["Sobhan", "Mohsen", "Yashar"],
];

for (let i = sina.length - 1; i >= 0; i--) {
  console.log(sina[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`----- Start Exercise ${exercise} -----`);
  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Exercise ${exercise}: Lifiting weights repetition ${rep} 🏋️`);
  }
}
*/

// ***************   Video 19   ***************
/*
// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifiting weights repetition ${rep}`);
// }

// let rep = 1;
// while (rep <= 10) {
//   console.log(`Lifiting weights repetition ${rep}`);
//   rep++;
// }

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
}
*/

// ***************   Video 20   ***************
// coding challenge

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bill) {
  if (50 <= bill && bill <= 300) return bill * 0.15;
  else return bill * 0.2;
};

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}

console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage(totals));
