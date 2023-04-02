const { Female, Male } = require("./Person");

class FamilyTree {
    constructor() {
        this.map = {}
    }

    getPerson(personName) {
        return this.map[personName];
    }

    getSon(personName) {
        const target = this.getPerson(personName);
        const children = target.children;

        // TBD
    }

    addPartner(royal, commoner, gender) {
        const royalPerson = this.getPerson(royal);
        if (royalPerson === undefined) {
            return ["PERSON_NOT_FOUND"]
        }
        const commonPerson = (gender === "Male") ? new Male(commoner) : new Female(commoner);
        this.map[commoner] = commonPerson;
        royalPerson.makePartner(commonPerson);
        return ["PARTNER_ADDED"]
    }

    addChild(motherName, childName, gender) {
        const mother = this.getPerson(motherName);
        const newChild = (gender === "Male") ? new Male(childName) : new Female(childName);
        newChild.mother = mother
        newChild.father = mother.partner
        this.map[childName] = newChild;
        try {
            mother.addChild(newChild);
        } catch (e) {
            return ["CHILD_ADDITION_FAILED"]
        }
        return ["CHILD_ADDED"]
    }

    getMaternalAunt(personName) {
        const res = []
        const person = this.getPerson(personName);
        const mother = person.mother;
        if (person === undefined) {
            return res
        }
        const motherSiblings = mother.mother.children;

        motherSiblings.forEach( (sibling) => {
            if (sibling !== mother && sibling instanceof Female) {
                res.push(sibling);
            }
        })
        
        return res;
    }

    getSiblings(personName) {
        const res = [];
        const person = this.getPerson(personName);
        const mother = person.mother;
        if (mother === undefined) {
            return res
        }
        const motherChildren = mother.children;

        motherChildren.forEach((sibling) => {
            if (sibling !== person) {
                res.push(sibling);
            }
        })

        return res;
    }

    getSisterInLaw(personName) {
        const res = [];
        const person = this.getPerson(personName);
        const mother = person.mother;
        if (mother === undefined) {
            return res
        }
        const motherChildren = mother.children;

        motherChildren.forEach((sibling) => {
            if (sibling !== person && sibling instanceof Male) {
                if (sibling.partner !== null);
                res.push(sibling.partner);
            }
        })

        return res;
    }
}

module.exports = FamilyTree;