'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ********************************    Video 3    ********************************
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice method - return a new array without mutating the original array
console.log(arr.slice(2));

console.log(arr.slice(2, 4));

console.log(arr.slice(-2));

console.log(arr.slice(1, -2));

// shallow copy with slice method
console.log(arr.slice());
// shallow copy with spread operator
console.log([...arr]);


// splice method - change (mutate) original array with deleting the selected elements
console.log(arr.splice(2)); // output: ['c', 'd', 'e']
console.log(arr); // output: ['a', 'b']

// remove the last element
console.log(arr.splice(-1));
console.log(arr);


// Reverse
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

// reverse method mutate the original array
console.log(arr2.reverse()); // output: ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // output: ['f', 'g', 'h', 'i', 'j']

// concat method - does not mutate the original array
const letters = arr.concat(arr2);
console.log(arr);
// concat 2 arrays using spread operator
console.log([...arr, ...arr2]);

// join method
console.log(letters.join(' - ')); // output: a - b - c - d - e - f - g - h
*/

// ********************************    Video 4    ********************************
// at method (ES2022)
/*
const arr = [23, 11, 64];

// the 2 below lines are equivalent
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// at method also works on strings
console.log('Sina'.at(0));
console.log('Sina'.at(-1));
*/

// ********************************    Video 5    ********************************
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const m of movements) {
for (const [index, m] of movements.entries()) {
  // access index using for of loop
  if (m > 0) console.log(`Movement ${index + 1}: Deposit ${m}`);
  else console.log(`Movement ${index + 1}: Withdrawal ${Math.abs(m)}`);
}

// forEach method
// forEach function is a high-order function
// iterates over array and executes a function for each element. in each iteration it pass the current element to the function.
movements.forEach(function (m) {
  if (m > 0) console.log(`Deposit ${m}`);
  else console.log(`Withdrawal ${Math.abs(m)}`);
});

// forEach method also pass index and whole array to callback function. so we can use it like below:

movements.forEach(function (m, index, array) {
  if (m > 0) console.log(`Movement ${index + 1}: Deposit ${m}`);
  else console.log(`Movement ${index + 1}: Withdrawal ${Math.abs(m)}`);
});
// continue and break statement does not work with forEach method at all.

*/

// ********************************    Video 6    ********************************
// forEach for maps
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// function argumnets: key, value, entrie map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// forEach for sets
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD']);

// keep the same signature as maps
currenciesUnique.forEach(function (value, key, map) {
  // key is exactly the same as value
  console.log(`${key}: ${value}`);
});

// throw away the key using _ convention
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

*/

// ********************************    Video 8    ********************************
// DOM Manipulation
// /*

const displayMovements = function (movements, sort = false) {
  // console.log(containerMovements.innerHTML);
  // empty the container to remove remaining movements first
  containerMovements.innerHTML = '';

  // part of video 24
  // we don't want to change movements itself, so we first make a copy with 'slice' method
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // create html element
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div> 
    `;

    // attach created element to the movements element
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);
// */

// ********************************    Video 9    ********************************
// coding challenge
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const juliaCopy = dogsJulia.slice(1, -2);
  const all = juliaCopy.concat(dogsKate);
  all.forEach(function (dog, index) {
    if (dog >= 3)
      console.log(`Dog number ${index} is an adult, and is ${dog} years old.`);
    else console.log(`Dog number ${index} is still a puppy`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/

// ********************************    Video 10    ********************************
// Map, Filter, Reduce array methods: create new arrays based on transformed arrays

// ********************************    Video 11    ********************************
// map method - unlike forEach it gives us a brand new array, the new array contains in each position the result of applying a callback function to original array elements

/*
const eurToUsd = 1.1;

const movementUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

console.log(movements);
console.log(movementUSD);

// replace above callback function with arrow function
const movementUSDArrow = movements.map(mov => mov * eurToUsd);
console.log(movementUSDArrow);

// write above code using 'for of' loop
const movementUSDfor = [];
for (const mov of movements) {
  movementUSDfor.push(mov * eurToUsd);
}
console.log(movementUSDfor);

// map method also have access to the value, index and whole array
const movementDescriptions = movements.map(function (value, index, array) {
  if (value > 0) {
    return `Movement ${index + 1}: Deposit ${value}`;
  } else {
    return `Movement ${index + 1}: Withdrawal ${Math.abs(value)}`;
  }
});

console.log(movementDescriptions);
*/

// ********************************    Video 12    ********************************

const createUsername = function (accs) {
  // we don't want to create a new array, we just want to modify the existing objects, so we use forEach method
  accs.forEach(function (acc) {
    acc['username'] = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word.at(0))
      .join('');
  });
};

createUsername(accounts);

// ********************************    Video 13    ********************************
// filter method
/*
console.log(movements);

const deposits = movements.filter(function (mov, index, arr) {
  return mov > 0;
});
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// rewrite above code using 'for of' loop
const depositsFor = [];
for (const mov of movements) {
  mov > 0 && depositsFor.push(mov);
}
console.log(depositsFor);
*/

// ********************************    Video 14    ********************************
// reduce method - accumulate all elements to one element
/*
console.log(movements);

// accumulator is the first parameter in reduce callback function
// second argument of reduce method is initial value of accumulator
const balance = movements.reduce(function (accumulator, current, i, arr) {
  console.log(`Iteration ${i} : accumulator = ${accumulator}`);
  return accumulator + current;
}, 0);
console.log(balance);

// rewrite above code using 'for of' loop
// we need external variable in this way
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);


// Maximum value using reduce method
const max = movements.reduce(function (acc, mov) {
  // always need to return accumulator to keep track of it
  return mov > acc ? mov : acc;
}, movements[0]);

console.log(max);

*/

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = account.balance + '€';
};
// calcDisplayBalance(account1);

// ********************************    Video 15    ********************************
// Coding challenge
/*
const calcAverageHumanAge = function (ages) {
  const humanAges = ages
    .map(function (age) {
      if (age <= 2) return age * 2;
      else return 16 + age * 4;
    })
    .filter(function (age) {
      return age >= 18;
    });
  return (
    humanAges.reduce(function (acc, age) {
      return acc + age;
    }, 0) / humanAges.length
  );
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

// ********************************    Video 16    ********************************
// Chaining methods
/*
// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = incomes + '€';

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = Math.abs(outcomes) + '€';

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1) // just if interest is greater than 1
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = interest + '€';
};

// calcDisplaySummary(account1.movements);

// ********************************    Video 17    ********************************
// Coding challenge
/*
const calcAverageHumanAge = function (ages) {
  return ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

// ********************************    Video 18    ********************************
// find method - retrive one element of array based condition
/*
console.log(movements);

// it only return one element (and not an array)
const firstWithdrawal = movements.find(function (mov) {
  return mov < 0; // return boolean
});

console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

// ********************************    Video 19    ********************************

const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);

  // Display balance
  calcDisplayBalance(account);

  // Display Summary
  calcDisplaySummary(account);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // prevent reloading page after click on button because it is a form element (in another work prevent form from submitting)

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // lose the focus on pin field
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// ********************************    Video 20    ********************************

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    account => account.username === inputTransferTo.value
  );

  // Clean input form
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    // Doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// ********************************    Video 21    ********************************
// findIndex method
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear the filed
  inputCloseUsername.value = inputClosePin.value = '';
});

// ********************************    Video 22    ********************************
// some and every methods
/*
console.log(movements);

// test for equality (using 'includes' method)
console.log(movements.includes(-130));
// rewrite this with some method
console.log(movements.some(mov => mov === -130));

// test for condition (using 'some' method) 
// 'some' method (it returns true if at least one element satisfy the condition)
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit); // true

const anyDeposit5000 = movements.some(mov => mov > 5000);
console.log(anyDeposit5000); // false

// 'Every' method (it returns true if all elements satisfy the condition)

// check if all movments are deposit
console.log(movements.every(mov => mov > 0)); // output: false
console.log(account4.movements.every(mov => mov > 0)); // output: true

// seperate callback
const deposit = mov => mov > 0;
console.log(movements.every(deposit));

*/

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// ********************************    Video 23    ********************************
/*
// 'flat method' ES2019
// gose only one level deep
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //output [1, 2, 3, 4, 5, 6, 7, 8]

// deeper nested array
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //output [[1, 2], 3, 4, [5, 6], 7, 8]

// goes 2 level deep (default is 1)
console.log(arrDeep.flat(2)); //output [1, 2, 3, 4, 5, 6, 7, 8]

// compute all accounts movements
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((accumulate, mov) => accumulate + mov, 0);

console.log(overalBalance);

// maping first and then flattening it is pretty common action. so flatMap introduces that do the both map and flat at the same time
// flatMap only goes 1 level deep and we can not change it
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((accumulate, mov) => accumulate + mov, 0);

console.log(overalBalance2);
*/

// ********************************    Video 24    ********************************
/*
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// sort method mutate the original array
console.log(owners.sort());

// Numbers
// convert everything to strings and then sort them based on that
console.log(movements);
console.log(movements.sort()); // outpu: [-130, -400, -650, 1300, 200, 3000, 450, 70]

// parameters: current value, next value
// return < 0: A, B (keep order)
// return > 0: B, A (switch order)

// ascending order
movements.sort(function (a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
});
// improve above code
movements.sort((a, b) => a - b);

console.log(movements);

// descending order
movements.sort(function (a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
});
// improve above code
movements.sort((a, b) => b - a);

console.log(movements);
*/

let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});

// ********************************    Video 25    ********************************
// Creating and filling arrays
/*

const x = new Array(7); // an array with 7 empty element
console.log(x); // output: [empty × 7]

// x.fill(1); // fill entire array with value 1 (mutate original array)
// console.log(x);

// x.fill(1, 3); // start filling from index 3 with value 1
// console.log(x);

x.fill(1, 3, 5); // start filling from index 3 until index 5 with value 1
console.log(x); // output: [empty × 3, 1, 1, empty × 2]

const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 4, 6);
console.log(arr); // output: [1, 2, 3, 4, 23, 23, 7]

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // output: [1, 1, 1, 1, 1, 1, 1]

// callback function parameters: currentValue, index, arr
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // output: [1, 2, 3, 4, 5, 6, 7]

const diceRoll = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random(100) * 6) + 1
);
console.log(g);

*/

// read movements from UI
labelBalance.addEventListener('click', function (e) {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // another way to create array from querySelectorAll:
  const movementsUI2 = [...querySelectorAll('.movements__value')];
  // in this way we need to maping in another step
});

// ********************************    Video 27    ********************************
/*
// Example.1) compute all deposits of all accounts
console.log(
  accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
);

// Example.2) how many deposits in accounts with at least 1000 dollars
console.log(
  accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov >= 1000)
    .reduce((acc, mov) => acc + 1, 0)
);
// another way
console.log(
  accounts
    .flatMap(acc => acc.movements)
    .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0)
);
// another way
console.log(
  accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length
);

// Example.3) create new object instead of number or string
const { depoits, withdralws } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // in 'reduce' method we always need to return accumulator
      // cur > 0 ? (sums.depoits += cur) : (sums.withdralws += cur);
      sums[cur > 0 ? 'depoits' : 'withdralws'] += cur;
      return sums;
    },
    { depoits: 0, withdralws: 0 }
  );
console.log(depoits, withdralws);

// Example.4)
// this is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str.replace(str[0], str[0].toUpperCase());
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

// ********************************    Video 28    ********************************
// coding challenge
/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1)
dogs.forEach(function (dog) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

// 2)
const sarahDog = dogs.find(function (dog) {
  return dog.owners.includes('Sarah');
});

if (sarahDog.curFood < sarahDog.recommendedFood * 0.9) {
  console.log('too little');
} else if (sarahDog.curFood > sarahDog.recommendedFood * 1.1) {
  console.log('too much');
} else if (
  sarahDog.curFood >= sarahDog.recommendedFood * 0.9 &&
  sarahDog.curFood <= sarahDog.recommendedFood * 1.1
) {
  console.log('enougth');
}

// 3)
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4)
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5)
const dogsOkay = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(dogsOkay);

// 6)
const checkEatingOkay = dog =>
  dog.curFood < dog.recommendedFood * 1.1 &&
  dog.curFood > dog.recommendedFood * 0.9;

console.log(dogs.some(checkEatingOkay));

// 7)
const okayFood = dogs.filter(checkEatingOkay);
console.log(okayFood);

// 8)
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));
*/
