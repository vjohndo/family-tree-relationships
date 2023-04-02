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
        if (mother === undefined) {
            return "PERSON_NOT_FOUND"
        }
        const newChild = (gender === "Male") ? new Male(childName) : new Female(childName);
        newChild.mother = mother
        newChild.father = mother.partner
        this.map[childName] = newChild;
        try {
            mother.addChild(newChild);
        } catch (e) {
            return "CHILD_ADDITION_FAILED"
        }
        return "CHILD_ADDED"
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

    getSiblings(personName) {
        const person = this.map[personName];
        const mother = person.mother;
        const motherChildren = mother.children;

        const res = []

        motherChildren.forEach( (sibling) => {
            if (sibling !== person) {
                res.push(sibling.name);
            }
        })
        return res.join(" ");
    }
}

module.exports = FamilyTree;