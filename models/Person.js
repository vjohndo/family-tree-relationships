class Person {
    constructor(name) {
        this.name = name;
        this.mother = null;
        this.father = null;
        this.partner = null;
        this.children = null;
    }

    makePartner(other) {
        this.partner = other
        other.partner = this
        this.children = []
        other.children = this.children
    }
}

class Male extends Person {
    constructor(name) {
        super(name);
    }

    addChild(...args) {
        throw new Error('Can not ADD_CHILD through Male')
    }
}

class Female extends Person {
    constructor(name) {
        super(name);
    }

    addChild(child) {
        this.children.push(child)
    }
}

module.exports = {
    Person: Person,
    Male: Male,
    Female: Female
}