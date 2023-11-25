'strict mode';

// Object.freeze only freezes the first level of the object. so it is not deep freeze
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

budget[0].value = 100000; // value changed
// budget[9] = 'jonas'; // nothing added to budget object

// make object immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// spendingLimits.jay = 200;
// console.log(spendingLimits); // did not changed

const getLimit = (limits, user) => limits?.[user] ?? 0;
// or
// const limit = spendingLimits[user] ? spendingLimits[user] : 0;

// this function mutate outside variable (has side effect). so this function is impure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, user)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBugdet1 = addExpense(budget, spendingLimits, 10000, 'Pizza 🍕');
console.log(newBugdet1);
const newBugdet2 = addExpense(
  newBugdet1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBugdet3 = addExpense(newBugdet2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBugdet3);

const checkExpenses = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });

  // for (const entry of budget) {
  //   const limit = spendingLimits?.[entry.user] ?? 0;

  //   if (entry.value < -limit) {
  //     entry.flag = 'limit';
  //   }
  // }
};
const finalBudget = checkExpenses(newBugdet3, spendingLimits);

console.log(budget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((acc, entry) => `${acc} / ${entry.description.slice(-2)}`, '');
  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);
