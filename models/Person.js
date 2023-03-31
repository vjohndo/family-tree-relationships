class Person {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
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

    addChild(child) {
        this.children.push(child)
    }
}

module.exports = Person