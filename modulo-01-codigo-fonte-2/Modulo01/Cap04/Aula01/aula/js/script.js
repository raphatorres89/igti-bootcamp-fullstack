'use strict';

/* VAR LET E CONST */
function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  i = 20;
  console.log(i);
}

// withVar();
// withLet();

/* ARROW FUNCTION */
function sum(a, b) {
  return a + b;
}

const sum2 = function (a, b) {
  return a + b;
};

const sum3 = (a, b) => {
  return a + b;
};

const sum4 = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

/* TEMPLATE LITERALS */
const name = 'Raphael';
const surname = 'Torres';
const text1 = 'Meu nome é ' + name + ' ' + surname;
const text2 = `Meu nome é ${name} ${surname}`;

console.log(text1);
console.log(text2);

/* DEFAULT PARAMETERS */
const sum5 = (a, b = 10) => a + b;
console.log(sum5(2, 3));
console.log(sum5(2));
