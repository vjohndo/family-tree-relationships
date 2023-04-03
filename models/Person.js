class Person {
  constructor(name) {
    this.name = name;
    this.mother;
    this.father;
    this.spouse;
    this.children;
  }

  getName() {
    return this.name;
  }

  getMother() {
    return this.mother;
  }

  setMother(mother) {
    this.mother = mother;
  }

  getFather() {
    return this.father;
  }

  setFather(father) {
    this.father = father;
  }

  getSpouse() {
    return this.spouse;
  }

  setSpouse(other) {
    this.spouse = other;
    other.spouse = this;
    this.children = [];
    other.children = this.children;
  }

  getChildren() {
    return this.children;
  }
}

class Male extends Person {
  constructor(name) {
    super(name);
  }
}

class Female extends Person {
  constructor(name) {
    super(name);
  }

  addChild(child) {
    this.children.push(child);
  }
}

module.exports = {
  Person: Person,
  Male: Male,
  Female: Female,
};
