const Person = require("./Person");

class FamilyTree {
    constructor() {
        this.map = {}
    }

    addPartner(royal, commoner, gender) {
        const royalPerson = this.map[royal];
        if (royalPerson == null) {
            return -1
        }
        const commonPerson = new Person(commoner, gender);
        this.map[commoner] = commonPerson;
        royalPerson.makePartner(commonPerson);
        return 0
    }

    addChild(motherName, childName, gender) {
        const mother = this.map[motherName];
        if (mother == null) {
            return -1
        }
        const newChild = new Person(childName, gender);
        newChild.mother = mother
        newChild.father = mother.partner
        this.map[childName] = newChild;
        mother.addChild(newChild);
        return 0
    }

    getMaternalAunt(personName) {
        const person = this.map[personName];
        const mother = person.mother;
        const motherSiblings = mother.mother.children;

        const res = []

        motherSiblings.forEach( (sibling) => {
            if (sibling !== mother && sibling.gender === "Female") {
                res.push(sibling.name);
            }
        })
        
        return res.join(" ");
    }
}

module.exports = FamilyTree;