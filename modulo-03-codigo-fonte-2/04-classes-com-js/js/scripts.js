class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} speaking`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) latindo`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) latindo`);
  }
}

const animal = new Animal('Totó');
const dog = new Dog('Ozzy', 'Shih Tzu');
const cat = new Cat('Judith', 'Tigerwood');

animal.speak();
dog.speak();
cat.speak();
