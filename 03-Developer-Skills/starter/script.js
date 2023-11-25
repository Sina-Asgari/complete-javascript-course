// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// problem 1
// const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// const amplitude = function (arr) {
//   let min = arr[0];
//   let max = arr[0];
//   for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] !== "number") continue;

//     if (arr[i] < min) min = arr[i];
//     if (arr[i] > max) max = arr[i];
//   }
//   console.log(min, max);
//   return max - min;
// };

// const amp = amplitude(temperatures);
// console.log(amp);

// *********************************  CODE CHALLENGE *********************************
const printForecast = function (arr) {
  const degreesCelcius = String.fromCodePoint(8451);
  let string = "... ";
  for (let i = 0; i < arr.length; i++) {
    string += `${arr[i]}${degreesCelcius} in ${i + 1} days ... `;
  }
  console.log(string);
};

printForecast([17, 21, 23]);
