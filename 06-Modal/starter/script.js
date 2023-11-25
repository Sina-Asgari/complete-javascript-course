'use strict';

// **********************      VIDEO 12       **********************
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// we have 3 buttons with 'show-modal' class name and querySelector just select the first one
// const btnsOpenModal = document.querySelector('.show-modal');
// console.log(btnsOpenModal);

// so for seleting all of them we use querySelectorAll() instead
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   console.log(btnsOpenModal[i].textContent);
// }

// **********************      VIDEO 13       **********************
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// **********************      VIDEO 14       **********************
// keyboard events are also so called global events because they do not event on specific element
// for global events we usally listen to whole document
// any key pressed this event will be happened
// check the event passed as argument
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
