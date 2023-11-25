'use strict';

// ***************************    Video 05    ***************************
// Constructor functions
// we use this to build an object using a function
// it is a completely normal function, the only defference between a normal function and a constructor function is that we call the constructor function with new operator
/*
const Person = function (firstName, birthYear) {
  // console.log(this);

  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER create a method inside the constructor function
  // because we create a copy of each method for each instance and if we have a lot of instances it will impact the performance
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// what happened when we call a function with new operator:
// 1. New empty object ({}) is created
// 2. function is called and "this" keyword is this new empty object (this = {})
// 3. empty object ({}) linked to prototype (create __proto__ property and set it's value to prototype property of constructor function)
// 4. object return atomatically from function

const sina = new Person('Sina', 1997);
console.log(sina);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(sina instanceof Person); // output: true

// ***************************    Video 06    ***************************
// Prototypes
// each and every function in JS automatically has a property called prototype and it also includes constructor functions, every object that created by a certain constructor function will get access to all methods and properties that we define on the constructors prototype property (in our example prototype property of constructor function = Person.prototype)

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  // "this" keyword is set to the object that calling the method
  console.log(2037 - this.birthYear);
};

sina.calcAge();

console.log(sina.__proto__);
// prototype of sina object is prototype property of constructor function
console.log(sina.__proto__ === Person.prototype); // output: true
console.log(Person.prototype.isPrototypeOf(sina)); // output: true

console.log(Person.prototype.isPrototypeOf(Person)); // output: false

// we can also add property to prototype
Person.prototype.species = 'Homo Sapiens';
// sina object has access to species property because of its prototype and this is not it's own property
console.log(sina.species, matilda.species);

console.log(sina.hasOwnProperty('firstName')); // output: true
console.log(sina.hasOwnProperty('species')); // output: false

// ***************************    Video 08    ***************************
console.log(sina.__proto__);

// object.prototype is top of prototype chain
console.log(sina.__proto__.__proto__); // prototype property of "object"
console.log(sina.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // constructor property points back to Person

const arr = [3, 4, 5, 8, 7, 12, 3, 8]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// extend array functionality
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
*/

// ***************************    Video 09    ***************************
// coding challenge
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('bmw', 120);
const mercedes = new Car('mercedes', 95);

bmw.accelerate();
bmw.brake();
bmw.brake();
*/

// ***************************    Video 10    ***************************
// ES6 Classes

/*
// class expersion (class are especial type of functions)
const PersonEx = class {};

// class declaration
class PersonDec {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // all of methods inside the class and outside the constructor will be on prototype of the object
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const sina = new PersonDec('Sina', 1997);
console.log(sina);

console.log(sina.__proto__ == PersonDec.prototype); // ouput: true

// PersonDec.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

sina.greet();

// 1. classes are NOT hoisted
// 2. classes are first-class citizen (we can pass them to function and return them from function)
// 3. classes are executed in strict mode
*/

// ***************************    Video 11    ***************************
/*
const account = {
  owner: 'sina',
  movements: [200, 530, 120, 300],

  // getter: simply add a get before function
  get latest() {
    return this.movements.at(-1);
  },

  // every setter needs exactly one parameter
  set latest(value) {
    this.movements.push(value);
  },
};

// use it as property and we don't call the method
console.log(account.latest);

account.latest = 500;

console.log(account.latest);

class PersonDec {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // all of methods inside the class and outside the constructor will be on prototype of the object
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

const sina = new PersonDec('Sina Asgari', 1997);
console.log(sina.fullName);

const walter = new PersonDec('Walter', 1997);
*/

// ***************************    Video 12    ***************************
// Static Methods
/*
console.log(Array.from(document.querySelectorAll('h1')));
// [1, 2, 3].from();
// this will give us error because this function is attached to entire constructor and not to prototype property of the constructor

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// create static method for function constructor
Person.hey = function () {
  console.log(`Hey there 🙋‍♂️`);
  console.log(this); // this here is entir constructor function
};

Person.hey(); // otuput: Hey there 🙋‍♂️

const sina = new Person('sina', 1997);
// it is not in prototype of sina object so it will throw an error
// sina.hey();

class PersonDec {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // all of methods inside the class and outside the constructor will be on prototype of the object
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log(`Hey there 🙋‍♂️`);
    console.log(this);
  }
}

PersonDec.hey();
*/

// ***************************    Video 13    ***************************
// Object.create

/*
// prototype of Person Object
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); //output: true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
*/

// ***************************    Video 14    ***************************
// Coding challenge

/*
class Car {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speedUS) {
    this.speed = speedUS * 1.6;
  }
}

const ford = new Car('Ford', 120);
console.log(ford.speedUS);
ford.speedUS = 100;
console.log(ford.speed);
*/

// ***************************    Video 15    ***************************
// Inheritance between "classes": constructor functions

/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // copy of person constructor function (parent class)
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);

  this.course = course;
};

// Linking prototypes, inherite student from person
Student.prototype = Object.create(Person.prototype);
console.dir(Student.prototype.constructor); // wrong answer: it shows Person but it should be Student, how to fix that?
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); // output: true
console.log(mike instanceof Person); // output: true
console.log(mike instanceof Object); // output: true
*/

// ***************************    Video 16    ***************************
// coding challenge

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.chargeBattery(90);
*/

// ***************************    Video 17    ***************************
// Inheritance Between "Classes": ES6 Classes

/*
class PersonDec {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // all of methods inside the class and outside the constructor will be on prototype of the object
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(`Hey there 🙋‍♂️`);
  }
}

// extends keyword here link the prototypes behind the scenes
class StudentDec extends PersonDec {
  // if we dont specify new property in respect to parent class we dont need constructor function in child class at all and parent constructor function will be called automatically
  constructor(fullName, birthYear, course) {
    // super function is the constructor function of parent class
    // Always needs to happen first, because it is responsible for creating the "this" keyword in subclass
    super(fullName, birthYear); // PersonDec.call(this, fullName, birthYear)
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // overwrite parent method
  calcAge() {
    console.log(`I'am ${2037 - this.birthYear} old`);
  }
}

const martha = new StudentDec('Martha Jones', 2012, 'Computer Science');
martha.introduce();
// overwrite version has been called
martha.calcAge();
*/

// ***************************    Video 18    ***************************
// Inheritance Between "Classes": Object.create

/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

// PersonProto is prototype of StudentProto object
const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// StudentProto object is prototype of jay object
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/

// ***************************    Video 19, 20    ***************************
// Encapsulation Protected Properties and Methods

/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.locale = navigator.language;
    // convention for protected properties
    this._pin = pin;
    this._movements = [];

    console.log(`Thanks for opening an accout, ${owner}`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Sina', 'EUR', 1111);
// acc1.movements.push(100);
// acc1.movements.push(-50);

acc1.deposit(100);
acc1.withdraw(50);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
*/

// ***************************    Video 21    ***************************
// Encapsulation Private Class Fields and Methods

/*
// 1) Public fields
// 2) Private fields
// 3) Public Methods
// 4) Private Methods
// (there is also the static version of this 4 type)
class Account {
  // 1) Public fields, they are in instances and not in prototype (referenceable by this keyword)
  locale = navigator.language;

  // 2) Private fields, they are in instances and not in prototype (referenceable by this keyword), (truly not accessible by outside of the class)
  // # simbol syntax make a field private
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // this.locale = navigator.language;
    this.#pin = pin;
    // this._pin = pin;
    // this._movements = [];

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public Methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  // 4) Private Methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Sina', 'EUR', 1111);
acc1.deposit(100);
acc1.withdraw(50);
acc1.requestLoan(1500);
// console.log(acc1.#movements); // error: it is a private field
console.log(acc1);
console.log(acc1.getMovements());

// ***************************    Video 22    ***************************
// Chaining

// for this we just "return this" in methods we need to chain (because "this" is current object)
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1);
*/

// ***************************    Video 24    ***************************

class Car {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speedUS) {
    this.speed = speedUS * 1.6;
  }
}

class EVCl extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
