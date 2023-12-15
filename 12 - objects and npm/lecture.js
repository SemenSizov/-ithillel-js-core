// Object.freeze() and delete
const shape = {
  width: 30,
  color: 'green',
  height: 15,
};
Object.freeze(shape); // freezes the object, so you can't make any changes to it
shape.color = 'red';
console.log(shape);

const box = {
  width: 30,
  color: 'green',
  height: 15,
};
delete box.height; // will delete entire property
box.width = undefined; // just set property to undefined
console.log(box); //

// OPTIONAL CHAINING OPERATOR

const response = {
  color: 'red',
  size: {
    height: 1,
    width: 10,
    // depth: {
    //   x: 1,
    //   y: 2,
    //   x: 3,
    // },
  },
  // print: () => {
  //   console.log('Hi');
  // },
};

// console.log(res.size.depth.x); // will throw an error
console.log(response.size.depth?.x); // won't throw  an error
response.print?.(); // won't throw  an error

// NULLISH COALESCING OPERATOR

// використовується для перевірки на значення null та undefined

const providedValue = ''; // try null, undefined, false
const defaultValue = 5;
const value = providedValue ?? defaultValue;
console.log(value);

// SPREAD OPERATOR
const fruits = ['apple', 'coconut', 'grape'];
const vegetables = ['potato', 'cucumber'];
console.log(fruits); // prints an array
console.log(...fruits); // prints several values

function printFruits(first, second, third, fourth) {
  console.log(first);
  console.log(second);
  console.log(third);
  console.log(fourth);
}
printFruits(...fruits);

const food = [...fruits];

console.log(food);
console.log(fruits === food);
const car = {
  color: 'violet',
  weight: 1500,
};

const vagon = { ...car, wheels: 6 };
const jeep = {
  gasTankVolume: 100,
};

const newCar = { ...vagon, ...jeep };
car.color = 'green';
console.log(car);

console.log(vagon);

// REST - use only in function arguments, collect arguments into array
function printArguments(...args) {
  console.log(args);
  for (const arg of args) {
    console.log(arg);
  }
}
printArguments(1, false, 567, 'yoda');

// OBJECT DESTRUCTURING
const user = {
  name: 'John',
  surname: 'Silverhand',
  age: 34,
  isLive: false,
  birthYear: 1988,
  group: 'Samurai',
};

const { isLive } = user;
console.log(isLive);
const { name: firstName, age, group: band } = user;
console.log(firstName);
console.log(age);
console.log(band);

// ARRAY DESTRUCTURING
const fruitsCopy = ['apple', 'coconut', 'grape', 'potato', 'cucumber'];

const [first, ...rest] = fruitsCopy;
const [second, ...rest2] = fruitsCopy;

console.log(first);
console.log(second);
console.log(rest2);

// PARAMETER OBJECT PATTERN

const input = {
  wood: true,
  workers: 123,
  concrete: 'yes',
  metal: 'no',
  time: 'infinity',
  money: 'not enought',
};

function createHouse1(input) {
  const { wood, workers, concrete, metal, time, money } = input;
  console.log(wood);
  console.log(concrete);
  console.log(time);
}

function createHouse({ wood, concrete, time }) {
  console.log(wood);
  console.log(concrete);
  console.log(time);
}

createHouse(input);
