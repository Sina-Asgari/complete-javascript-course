'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// ***************************   Video 11    ***************************

// Page navigation
// this approach is not efficient, because we add a same function handler once for each elements. we create copy for each element and it will imacpt the performance and it's not a clean solution. better solution is do use event delegation
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    // stops from scrolling to href specified in HTML document
    e.preventDefault();

    // Smooth scrolling
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// event delegation: in event delegation we use the fact taht events bubbled up and we do tha by putting the event listener on a common parents of all the elements that we are interested in (in our example it is the container that is around all links)
// 2 steps we need:
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  // where the event is accully happend: in "e.target"
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ***************************   Video 13    ***************************
// Tabbed component
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

// using event delegation for tabs
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Active tab
  // remove 'operations__tab--active' from all tabs before adding it to new tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ***************************   Video 14    ***************************
// Menu fade annimation - Passing Arguments to Event Handlers
/*
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });

    logo.style.opacity = opacity;
  }
};

// mouseenter doesn't bubble but mouseover will be
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
*/

// do even better using bind method
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// ***************************   Video 15    ***************************
// Sticky navigation
/*
const initalCoords = section1.getBoundingClientRect();

// scroll event is on window and not document, when we scroll it will be fired, it's not efficient and should be avoided
window.addEventListener('scroll', function (e) {
  // get scroll position (distance from viewport to top of the page)

  if (window.scrollY > initalCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

// ***************************   Video 16    ***************************
// Intersection Observer API: this API allows our code to observe changes to the way that certain target element intersects other elements or the way it intersect wiht viewport

/* education part
// this callback function will be called each time that the observer element (or target element) is intersecting the root element at the threshold we defined

// the entries is accully an array of threshold and we can pass multiple thresholds, the second argument is accully the object of IntersectionObserver we created
const obsCallback = function (entires, observer) {
  entires.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  // an element that target intercting
  root: null, // if we assing null it will observe entire viewport
  // the percentage of intersection witch observer callback will be called
  threshold: [0, 0.2], // 0 means when target element moves compllety out of the view and also as soon as it enters the view
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
// use the observer to observe certain element
observer.observe(section1);
*/
const header = document.querySelector('.header');
const navHight = nav.getBoundingClientRect().height;

const stickyNav = function (entires, observer) {
  const [entry] = entires;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHight}px`,
});
headerObserver.observe(header);

// ***************************   Video 17    ***************************
// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // unobsevering observer
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// Observe multiple elements with one observer
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// ***************************   Video 18    ***************************
// Lazy loading, images have huge impacet on website performance and using this strategy will improve website performance

// select images that have data-src attribute
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  // guard cluase
  if (!entry.isIntersecting) return;

  // Replace sec with data-src
  entry.target.src = entry.target.dataset.src;

  // remove 'lazy-img' from classList
  // replacing src attribute happend behind the scene and when it finished it emit the load event and we want to remove blur filter when it finished the loading img because someone maybe have slow connection internet
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // load earlier before user now we use lazy loading
});

imgTargets.forEach(img => imgObserver.observe(img));

// ***************************   Video 19    ***************************
// Slider Component
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

// for better visibility (just in development phase)
// slider.style.overflow = 'visible';
// slider.style.transform = 'scale(0.3) translateX(-1200px)';

///////////////////////// this is a part of video 20
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `
      <button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateDot(0);
/////////////////////////

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

// shift each slide to be side by side of each other
goToSlide(0);
// refactord this code using "goToSlide" function:
// slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

// go to next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
  // refactord this code using "goToSlide" function:
  // slides.forEach(
  //   (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
  // );
};
// curSlide = 1: -100%, 0%, 100%, 200%, 300%

btnRight.addEventListener('click', nextSlide);

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnLeft.addEventListener('click', prevSlide);

// ***************************   Video 20    ***************************
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  // using short curccuting
  e.key === 'ArrowLeft' && prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// ***************************   Video 05    ***************************
// Select, Create and Delete elements using JS

/*
//////////// Selecting elements
// for this 3 special elements we don't need any selector
// Select entire document
console.log(document.documentElement);

// Select head
console.log(document.head);

// Select body
console.log(document.body);

// for other elements we need 'querySelector'
const header = document.querySelector('.header'); // return the first element matches selector class header

// for selecting multiple elements we should use 'querySelectorAll'
const allSections = document.querySelectorAll('.section'); // return NodeList

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // all the elements with name 'button' (return type is HTMLCollection -> after any change in DOM elements this type will be update immediately, same thing doesn't happen with NodeList)
console.log(allButtons);

document.getElementsByClassName('btn'); // it also return a live HTMLCollection

//////////// Creating and inserting elements

// create a DOM element
const message = document.createElement('div');
// add class to new created element
message.classList.add('cookie-message');
// insert text
// message.textContent =
//   'We use cookied for improved functionality and analytics.';

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

// insert it to the DOM
// prepend add the element as the first child
// header.prepend(message);

// add as last child
header.append(message);
// it inserted only once beacuse it is a live element in DOM and can not be in multiple places at the same time
// because we first prepend and then append, acculy append move the element as first child to last child and not inserted. so we can use prepend and append to move elements

// if we want to insert multiple copy of the same element?
// we need first copy the element
// header.append(message.cloneNode(true)); // all the child elements also be copied

// header.before(message); // add message before header (as siblings with header)
// header.after(message); // add message after header (as siblings with header)

//////////// Deleteing elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
    // old way:
    // message.parentElement().removeChild(message);
  });
*/

// ***************************   Video 06    ***************************
/*
const header = document.querySelector('.header');

// create a DOM element
const message = document.createElement('div');
// add class to new created element
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

header.append(message);

document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });

/////////// Styles
// set styles as inline styles (Directly in DOM)
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// we get nothing!!, because using style property only works for inline styles that we set ourselfs also using style property
console.log(message.style.height);

// for example below code works because we set with "message.style.backgroundColor = '#37383d';" code and it is inline style
console.log(message.style.backgroundColor);

// we get nothing because color is set in CSS file and is not inline style
console.log(message.style.color);

// but there is a way to get these styles and it is using "getComputedStyle" function
// it returns real style as appear in page even we do not declare in css
console.log(getComputedStyle(message));

// get certain property from 'getComputedStyle'
console.log(getComputedStyle(message).height);

// increase height of banner
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //remember we also need unit

// css custom properties (:root property in css file) (:root in css means document element(documentElement) in JS)
document.documentElement.style.setProperty('--color-primary', 'orangered');

/////////// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo);
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); // it is className and not class (Non-standard)

// custom attributes would not be create using JS
console.log(logo.designer); // output: undefined
// get it from DOM:
console.log(logo.getAttribute('designer')); // output: sina

// change attributes
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // output: http://127.0.0.1:5500/img/logo.png (absolute version)
console.log(logo.getAttribute('src')); // output: img/logo.png (relative version)
// also works in the same way in href attribute for links

/////////// Data Attributes (special attributes that start with data)
// data-version-number="3.0" in <img> in <nav>
console.log(logo.dataset.versionNumber); // in HTML file we use '-' but here we use camelCase
// these special attributes always stored in dataset object
// we use data attributes when we work with UI specially when we store data in user interface (basically in HTML code)

/////////// Classes
logo.classList.add('c'); // we can add multiple classes by passing multiple values: logo.classList.add('c', 'j')
logo.classList.remove('c');
logo.classList.contains('c');
logo.classList.toggle('c');

// other way to set class (Don't use because override all class and can only pass one class)
logo.className = 'sina';
*/

// ***************************   Video 07    ***************************
// Smooth scrolling

/*
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //////// WAY 1
  // first get the coordinates of the element we want to scroll to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // e.target means btnScrollTo element
  console.log(e.target.getBoundingClientRect());
  // getBoundingClientRect output is relevant to viewport

  console.log(
    `Current scroll position (X/Y): ${window.pageXOffset}, ${window.pageYOffset}`
  );

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // it only scrolls with respect to viewport so it doesn't work properly
  window.scrollTo(s1coords.left, s1coords.top);

  // how to fix this? top to viewport + current scroll position
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );

  // Smooth scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });


  //////// WAY 2 (Modern way)
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

// ***************************   Video 08    ***************************
/*
const h1 = document.querySelector('h1');
// 1) we prefer this way, we can use this way to add multiple functions, but way 2 overrides the previous function
h1.addEventListener('mouseenter', function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
});

// 2) another way to attaching an event listener to an element
// onevent property directly on element
h1.onmouseenter = function (e) {
  alert('onmouseenter: Great! You are reading the heading :D');
};


// we can remove an event listener, for that we have to export function to named function
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // remove event listener
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// or we can remove an event listener after certain time
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// handling events using HTML attribute (directly in HTML file, should not be used anymore)
*/

// ***************************   Video 10    ***************************
// Event Propagation

/*

// create random color
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// all these 3 event handlers, handle the same event (bubbling up)
// the 'e' (event) each of the event handlers receives is the exact same event
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // e.target means where the event originated, where the event first happened (in this case where click happened) and it is not the element on which the event handler was attached
  console.log('LINK', e.target);

  // e.currentTarget is the element on which the event handler was attached
  // in another word "e.currentTarget" equals to "this" keyword
  console.log('LINK', e.currentTarget);

  // console.log(e.currentTarget === this); //output: true

  /////// Stop Propagation
  // e.stopPropagation();
  // two parent elements do not change their background colors (event never arrived to those elements)
});

// parent of ".nav__link"
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
  console.log('CONTAINER', e.currentTarget);
});

// parent of ".nav__links"
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target);
    console.log('NAV', e.currentTarget);
  },
  true // event handler will no longer listen to bubbling events but instead to capturing events
);
*/

// ***************************   Video 12    ***************************
// DOM Traversing
/*
const h1 = document.querySelector('h1');

/////// Going downwards: childs

// we can also use "querySelector" and "querySelectorAll" on elements
// select all the elements with highlight class that are children of h1 element (no matter how deep is these children) "only" h1 children elements will be selected
console.log(h1.querySelectorAll('.highlight'));

// if we need direct children
console.log(h1.childNodes); // nodes can be text comments and etc...
console.log(h1.children); // return a live collection (HTMLCollection). it returns only elements (it only uses for direct children)

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

/////// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement); // we are more interested in this case

// find parent element no matter how far it is in DOM tree (its useful for event delegation)
// in this case we select the closest header to h1 element that is parent of that
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// it will be the element itself
h1.closest('h1').style.background = 'var(--gradient-primary)';
// "closest" is opposit of "querySelector"

/////// Going sideways: siblings
// we only have access to direct siblings (previous and next one)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// how to read all siblings and not just direct ones:
// go to parent element and read all childern
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

// ***************************   Video 21    ***************************
// Lifecycle DOM events
// couple of events occurs in DOM during webpages lifecycle
// lifecycle: right from the moment the page is first accessed until the user leaves it

/*
// DOMContentLoaded Event: it occuerd as soon as HTML is completely parsed (downloaded and converted to DOM tree and all scprits must be downloaded and execute) by document, not waited for images and other external resources to load
// we want all our code to execute after DOMContentLoaded event happend, so we should put all over code to this addEventListener? NO, because we add "<script src="script.js"></script>" as last line in HTML document and it will be read after DOM tree hase been created
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HEML parsed and dom tree build', e);
});

// Load Event: it will fired by window as soon as not only the HTML is parsed but also all the images and external resources like css files also loaded
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// beforeunload Event: this event created immediately before a user is about to leave a page, for example after click the close tab in browser

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  // to display leaving confirmation we need to set the return value on event to empty string
  e.returnValue = '';
});
*/

// ***************************   Video 22    ***************************
// different way to loading a JS script in html
