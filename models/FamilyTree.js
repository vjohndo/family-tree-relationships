const { Female, Male } = require("./Person");

class FamilyTree {
    constructor() {
        this.map = {}
    }

    addPartner(royal, commoner, gender) {
        const royalPerson = this.map[royal];
        if (royalPerson == null) {
            return -1
        }
        const commonPerson = (gender === "Male") ? new Male(commoner) : new Female(commoner);
        this.map[commoner] = commonPerson;
        royalPerson.makePartner(commonPerson);
        return 0
    }

    addChild(motherName, childName, gender) {
        const mother = this.map[motherName];
        if (mother === null) {
            return -1
        }
        const newChild = (gender === "Male") ? new Male(childName) : new Female(childName);
        newChild.mother = mother
        newChild.father = mother.partner
        this.map[childName] = newChild;
        try {
            mother.addChild(newChild);
        } catch (e) {
            console.error(e);
            return -1
        }
        return 0
    }

    getMaternalAunt(personName) {
        const person = this.map[personName];
        const mother = person.mother;
        const motherSiblings = mother.mother.children;

        const res = []

        motherSiblings.forEach( (sibling) => {
            if (sibling !== mother && sibling instanceof Female) {
                res.push(sibling.name);
            }
        })
        
        return res.join(" ");
    }
}

module.exports = FamilyTree;