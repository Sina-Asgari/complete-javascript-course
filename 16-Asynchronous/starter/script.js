'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// ****************************    Video 05     ****************************
// AJAX Call

/*
// old school way
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
    <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
       <p class="country__row"><span>👫</span>${(
         +data.population / 1000000
       ).toFixed(1)} people</p>
         <p class="country__row"><span>🗣️</span>${Object.values(
           data.languages
         )}</p>
           <p class="country__row"><span>💰</span>${
             Object.values(data.currencies)[0].name
           }</p>
            </div>
            </article>
            `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// we make 3 request in parallel and we could not control which one to finish first
getCountryData('usa');
getCountryData('portugal');
getCountryData('germany');
*/

// ****************************    Video 07     ****************************
// sequence of AJAX Calls

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.official}</h3>
  <h4 class="country__region">${data.region}</h4>
     <p class="country__row"><span>👫</span>${(
       +data.population / 1000000
     ).toFixed(1)} people</p>
       <p class="country__row"><span>🗣️</span>${Object.values(
         data.languages
       )}</p>
         <p class="country__row"><span>💰</span>${
           Object.values(data.currencies)[0].name
         }</p>
          </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

/*
// we have nested callbacks here (callback hell: when we have a lot of nested callbacks in order to execute asynchrouns tasks in sequence)
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor country (2)
    const [neighbor] = data.borders;

    if (!neighbor) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      // Render country 2
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

// callback hell
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// ****************************    Video 08     ****************************
// Promises and fetch API (for scapeing callback hell)

/*
// fetch function immediately return a promise and in the beginning it is pending because asynchronous task of geting data is still running in background
const request = fetch('https://restcountries.com/v3.1/name/portugal');
console.log(request);
*/

// ****************************    Video 09     ****************************
// Consume Promise

/*
const getCountryData = function (country) {
  // when a promise is fullfiled we execute a callback function that passed in "then" method on promise
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      // json() method is also an asynchrouns function and it means it return a promise
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

// just simplify above code:
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('usa');
*/

// ****************************    Video 10     ****************************
// Chaining Promises

/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;
      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};

getCountryData('usa');
// getCountryData('portugal');
*/

// ****************************    Video 11     ****************************
// Handling Rejected Promises

/*
// first callback function in "then" method is always for fullfiled situation and second callback function is for rejected situation

// fetch promise will be reject only when there is no internet connection

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => {
        console.log(response);

        if (!response.ok)
          // creating and throwing an error in any "then" methods cause promise immediately reject and go to "catch" method
          throw new Error(`Country not found ${response.status}`);
        return response.json();
      }
      // err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;
      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(
      response => response.json()
      // err => alert(err)
    )
    .then(data => renderCountry(data[0], 'neighbour'))
    // or we can catch all errors in one place at the end of the chain
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}`);
    })
    // this callback function always will be called no matter what
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('adgwyhdytd');
*/

// ****************************    Video 12     ****************************
// Throwing errors manually

/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found');
      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong 💥💥 ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

// getCountryData('adgwyhdytd');
getCountryData('australia');
*/

// ****************************    Video 13     ****************************
// Coding challenge

/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`problem with geocoding ${res.status}`);
      // if (res.status === 403) throw new Error('Too many requests');
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`💥 Error: ${err.message} 💥`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

// ****************************    Video 15     ****************************
// the Event loop in action

/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');

// Result order:
// Test start
// Test end
// Resolved promise 1
// 0 sec timer


// Add new Promise with heavy task
// microtask take along time and it is not asynchronous task itself
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});

// Result order:
// Test start
// Test end
// Resolved promise 1
// Resolved promise 2 (this take along time to execute)
// 0 sec timer (it is not accully after 0 second)
*/

// ****************************    Video 16     ****************************
// Building a simple promise

/*
// Promise object take one argument and it is called Executer function
// as soon as the promise constructor runs, it will automatically execute the executer function that we passed in, and as it execute this function it will pass 2 other functions as arguments named resolve and reject
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // call resolve as function will mark this promise as fulfilled
      // what ever value we pass into the resolve function it will be the result of the Promise that will be available in "then" handler to consume it
      resolve('You WIN 🤑');
    } else {
      // in reject function we pass the error message that later want to be able to catch in error handler
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

// consume promise using "then" method
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('5 seconds passed');
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject('Problem!').catch(x => console.error(x));
*/

// ****************************    Video 17     ****************************
// Promisifying Geolocation

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // Make it even simpler:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(lat, lng);
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`💥 Error: ${err.message} 💥`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
*/

// ****************************    Video 18     ****************************
// coding challenge

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

*/

// ****************************    Video 19     ****************************
// async await (ES2017)

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // Make it even simpler:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// this function will keep running in background will performing the code inside of it then when the function is done it automatically return a promise, async function always return a promise
// inside async function we can have one or more await statements, await will stop code execution until the promise is fulfilled
const whereAmI = async function () {
  const position = await getPosition();
  const { latitude: lat, longitude: lng } = position.coords;
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  const data = await res.json();
  renderCountry(data[0]);
};

whereAmI();
console.log('FIRST');
*/

// ****************************    Video 20     ****************************
// Error handling with try catch

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error('Problem getting location data');

    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.log(err);
    renderError(`Somthing went wrong ${err.message}`);
  }
};

whereAmI();
*/

// ****************************    Video 21     ****************************
// Return value from async function

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error('Problem getting location data');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.log(err);
    renderError(`Somthing went wrong ${err.message}`);

    // reject promise returned from async function
    throw err;
  }
};

whereAmI();

console.log('1: will get location');
// const city = whereAmI();
// console.log(city);   // it return a promise
whereAmI()
  .then(city => console.log(city)) // this will be return what we specified in return section of async function
  .catch(err => console.error(err))
  .finally(() => console.log('3: finish getting location'));
console.log('3: finished getting location');


(async function () {
  try {
    const city = await whereAmI();
    // const city = await res.json();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: finished getting location');
})();
*/

// ****************************    Video 22     ****************************
// Running promises in parallel

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    // these 3 ajax calls runs in sequence and not in parallel
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log(data1.capital, data2.capital, data3.capital);

    // run promises in parallel using "Promise.all". if one promise rejects all other promises will be reject as well
    // Promise.all is Promise Combinator
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.flatMap(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

// ****************************    Video 23     ****************************
// Promise Combinator (recives an array of promises and return a promise)
/*

////// 1) Promise.all: if one promise rejects all other promises will be reject as well

////// 2) Promise.race: it will settle (value be available, no matter rejected or fulfiled) as soon as one of promises settle

(async function () {
  const res = await Promise.race([
    getJSON('https://restcountries.com/v3.1/name/italia'),
    getJSON('https://restcountries.com/v3.1/name/egypt'),
    getJSON('https://restcountries.com/v3.1/name/mexico'),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('request timeout'));
    }, sec * 1000);
  });
};

// using "then" and "catch" methods
Promise.race([
  getJSON('https://restcountries.com/v3.1/name/tanzania'),
  timeout(0.7),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

// using async await keywords
(async function () {
  try {
    const res = await Promise.race([
      getJSON('https://restcountries.com/v3.1/name/tanzania'),
      timeout(0.5),
    ]);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
})();

////// 3) Promise.allSettled: Promise.all will shortcircuit as soon as one promise will rejects but Promise.allSettled never will be shortcircuit

Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

////// 4) Promise.any: returns the first fulfilled promise and ignores rejected promises
Promise.any([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
*/

// ****************************    Video 24     ****************************
// coding challenge

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// Part 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

// Part 2
const loadAll = async function (imgArr) {
  try {
    // these will be promises and not imgs elements
    const imgs = imgArr.map(async img => await createImage(img));

    // get images elements
    const imgsEl = await Promise.all(imgs);

    imgsEl.forEach(img => img.className.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
