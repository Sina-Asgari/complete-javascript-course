'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-11-06T17:01:17.194Z',
    '2023-11-07T23:36:17.929Z',
    '2023-11-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

// **********    Video 10    **********
const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

const formatMovementDate = function (date, locale) {
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // return `${String(date.getDate()).padStart(2, 0)}/${String(
    //   date.getMonth()
    // ).padStart(2, 0)}/${date.getFullYear()}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
// **********    Video 10    **********

// **********    Video 12    **********
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
// **********    Video 12    **********

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // **********    Video 10    **********
    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);
    // **********    Video 10    **********

    // **********    Video 12    **********
    const formattedMov = formatCurrency(mov, account.locale, account.currency);
    // **********    Video 12    **********

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(acc.balance);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// ******    Video 14    ******
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //  in each call, print the remainint time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }

    // decrease 1s
    time--;
  };

  // set time to 2 minutes
  let time = 120;

  tick();

  // call the timer every second
  const timer = setInterval(tick, 1000);

  return timer;
};
// ******    Video 14    ******

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Show time in Application
    // const now = new Date();
    // labelDate.textContent = `${String(now.getDate()).padStart(2, 0)}/${String(
    //   now.getMonth() + 1
    // ).padStart(2, 0)}/${now.getFullYear()}, ${String(now.getHours()).padStart(
    //   2,
    //   0
    // )}:${String(now.getMinutes()).padStart(2, 0)}`;

    // ******    Video 11    ******
    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // option: long, 2-digit, numeric
      year: 'numeric', // option: 2-digit, numeric
      // weekday: 'long', // option: long, short, narrow
    };

    // const locale = navigator.language; // en-US (get locale from browser)
    const locale = currentAccount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // ******    Video 11    ******

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // ******    Video 14    ******
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // ******    Video 14    ******

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    // ******    Video 14    ******
    clearInterval(timer);
    timer = startLogOutTimer();
    // ******    Video 14    ******
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      // ******    Video 14    ******
      clearInterval(timer);
      timer = startLogOutTimer();
      // ******    Video 14    ******
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// *******************************    Video 3    *******************************
// in JS all number internaly represented as float numbers
/*
console.log(23 === 23.0); // ouput: true

console.log(0.1 + 0.2); // ouput: 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // output: false

// convert string to number
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px')); // output: 30

// string should start with number, otherwise it would not work
console.log(Number.parseInt('e23')); // output: NaN

console.log(Number.parseInt('2.5rem')); // output: 2
console.log(Number.parseFloat('2.5rem')); // output: 2.5

// if a value is NaN
console.log(Number.isNaN(20)); // output: false
console.log(Number.isNaN('20')); // output: false
console.log(Number.isNaN(+'20X')); // output: true
console.log(Number.isNaN(23 / 0)); // output: false

// better way to check if a value is number
console.log(Number.isFinite(20)); // output: true
console.log(Number.isFinite('20')); // output: false
console.log(Number.isFinite(+'20X')); // output: false
console.log(Number.isFinite(23 / 0)); // output: false

console.log(Number.isInteger(23)); // output: true
console.log(Number.isInteger(23.0)); // output: true
console.log(Number.isInteger(23 / 0)); // output: false
*/

// *******************************    Video 4    *******************************
/*
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2)); // output: 23
// do type coercion
console.log(Math.max(5, 18, '23', 11, 2)); // output: 23

// do not parsing
console.log(Math.max(5, 18, '23px', 11, 2)); // output: NaN

console.log(Math.min(5, 18, 23, 11, 2)); // output: 2

console.log(Math.PI); // output: 3.141592653589793
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// create random number
console.log(Math.trunc(Math.random() * 6) + 1);

// create random number between min and max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.round(23.3)); // output: 23
console.log(Math.round(23.9)); // output: 24

console.log(Math.ceil(23.3)); // output: 24
console.log(Math.ceil(23.9)); // output: 24

console.log(Math.floor(23.3)); // output: 23
console.log(Math.floor(23.9)); // output: 23

console.log(Math.trunc(-23.3)); // output: -23
console.log(Math.floor(-23.3)); // output: -24

// Rounding decimals
// number is primitive and primitives do not have methods so by puting it in parentheses we do 'boxing' and means to transfer it to Number object and when operation is finished it will convert it back to primitive

console.log((2.7).toFixed(0)); // output: 3 (toFixed return string)
console.log((2.7).toFixed(3)); // output: 2.700
console.log((2.345).toFixed(2)); // output: 2.35

console.log(+(2.345).toFixed(2)); // output: 2.35 (convert string to number)
*/

// *******************************    Video 5    *******************************
// Remainder Operator
/*
console.log(5 % 2); // output: 1

const isEven = num => num % 2 === 0;

console.log(isEven(5));
console.log(isEven(8));

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = 'blue';
    }
  });
});
*/

// *******************************    Video 6    *******************************
// Numberic seperator (ES2021)
/*
// using '_' to seperator numbers
const diameter = 287_460_000_000;
console.log(diameter); // output: 287460000000 (JS ignore _)

const price = 345_99;
console.log(price); // output: 34599 (JS ignore _)

const transferFee1 = 15_00;
const transferFee2 = 1_500;
console.log(transferFee1, transferFee2);

const PI = 3.1415; // we only can put '_' between numbers (begging and end of the number and before and after '.' is not allowed)

console.log(Number('230000')); // output: 230000
console.log(Number('230_000')); // output: NaN (we only should add _ in numbers and not strings)
console.log(Number.parseInt('230_000')); // output: 230
*/

// *******************************    Video 7    *******************************
// BigInt (ES2020)
/*
 
console.log(2 ** 53 - 1); // biggest number can in JS
// equivalent to:
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 + 1); // returns not correct value

// add 'n' to the end of the number make it big number (BigInt)
console.log(45975134879516794543157976551n);
// or:
console.log(BigInt(45975134879516794543157976551));

// Operations
console.log(10000n + 10000n);

console.log(4587235485n * 985124785326981547895431320487950n);

// console.log(Math.sqrt(16n)); // dose not work

// we can not mix BigInt with other types
const huge = 48794321549798451321n;
const num = 23;
// console.log(huge * num);
// so to fix this we have to convert number to BigInt (using constructor):
console.log(huge * BigInt(num));

console.log(20n > 15); // this is exception

console.log(15n === 15); // === do not do type coercion so output is false

console.log(15n == 15); // in this situation JS do type coercion so output is true

console.log(huge + 'is REALLY big !!!'); // exception) BigInt here converts to string

// Divisions
console.log(10n / 3n); // output: 3n (cut of decimal part)
console.log(10 / 3); // output: 3.333333
*/

// *******************************    Video 8    *******************************
/*
// Create a date
const now = new Date();
console.log(now); // Wed Nov 08 2023 09:19:06 GMT+0330 (Iran Standard Time)

console.log(new Date('Nov 08 2023 09:17:12')); // Wed Nov 08 2023 09:17:12 GMT+0330 (Iran Standard Time)
console.log(new Date('December 24, 2015')); // Thu Dec 24 2015 00:00:00 GMT+0330 (Iran Standard Time)

console.log(new Date(account1.movementsDates[0]));

// year, month, day, hour, minute, second (month is zero-based!!)
console.log(new Date(2037, 10, 19, 15, 23, 5));

// auto-correct of month
console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0330 (Iran Standard Time)

// pass miliseconds after unix time (1970 1 1)
console.log(new Date(0));
// 3 days after unix time
console.log(new Date(1000 * 60 * 60 * 24 * 3));

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // output: 2037
console.log(future.getMonth()); // output: 10 (it is zero based)
console.log(future.getDate()); // return the day of the month
console.log(future.getDay()); // return the day of the week
console.log(future.toISOString()); // output: 2037-11-19T11:53:00.000Z

// timestamp: miliseconds pass after 1970,1,1
console.log(future.getTime()); // output: 2142244380000 (timestamp)

console.log(Date.now()); // current timestamp

// set methods
future.setFullYear(2040);
future.setMonth(5);
future.setDate(30);
console.log(future);
*/

// *******************************    Video 10    *******************************
// Operations with dates
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future)); // it convert it to timestamp
console.log(+future);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

console.log(new Date());
*/

// *******************************    Video 12    *******************************
// Internationalizing Numbers (Intl)
/*
const num = 3887545.23;

const options = {
  style: 'currency', // unit, percent, currency
  currency: 'EUR',
  unit: 'mile-per-hour', // options: celsius, mile-per-hour
  // useGrouping: false,
};

console.log('US:', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  'Browser:',
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

// *******************************    Video 13    *******************************
// Timers:
// setTimout -> runs just once after a defined time
// setInerval -> keeps running for ever until we stop it
/*

////////  setTimout
// application running would not stop here and it will running, for proof we see 'Waiting...' first and then 'Here is your pizza 🍕'
setTimeout(() => {
  console.log('Here is your pizza 🍕');
}, 3000);

console.log('Waiting...');

// all argmunet after delay argument will be passed to callback function
setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza ${ing1} ${ing2} 🍕`);
  },
  3000,
  'Olives', // first argument of callback function
  'Spinach' // second argument of callback function
);

const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza ${ing1} ${ing2} 🍕`);
  },
  3000,
  ...ingredients
);

// we can cancel timeout before delay time arrive
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

////////  setInerval
setInterval(function () {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  console.log(new Intl.DateTimeFormat('en-US', options).format(new Date()));
}, 1000);
*/

// *******************************    Video 14    *******************************
