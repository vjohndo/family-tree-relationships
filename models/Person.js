class Person {
    constructor(name) {
        this.name = name;
        this.mother;
        this.father;
        this.partner;
        this.children;
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