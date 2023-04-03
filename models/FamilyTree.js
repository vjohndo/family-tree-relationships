const {Female, Male} = require('./Person');

class FamilyTree {
  constructor() {
    this.familyMap = {};
  }

  hasMember(name) {
    return name in this.familyMap;
  }

  addNewMember(name, gender) {
    if (this.hasMember(name)) {
      return ['MEMBER_ADDITION_FAILED'];
    }
    const newMember = (gender === 'Male') ?
      new Male(name) :
      new Female(name);
    this.familyMap[name] = newMember;
    return ['MEMBER_ADDED']
  };

  addPartner(existingMemberName, newMemberName, gender) {
    if (this.hasMember(newMemberName)) {
      return ['PARTNER_ADDITION_FAILED'];
    }
    const existingMember = this.getPerson(existingMemberName);
    const newMember = (gender === 'Male') ?
      new Male(newMemberName) :
      new Female(newMemberName);
    this.familyMap[newMemberName] = newMember;
    existingMember.setSpouse(newMember);
    return ['PARTNER_ADDED'];
  }

  addChild(motherName, childName, gender) {
    if (this.hasMember(childName)) {
      return ['CHILD_ADDITION_FAILED'];
    }
    const mother = this.getPerson(motherName);
    const newChild = (gender === 'Male') ?
      new Male(childName) :
      new Female(childName);
    newChild.setMother(mother);
    newChild.setFather(mother.getSpouse());
    this.familyMap[childName] = newChild;
    try {
      mother.addChild(newChild);
    } catch (e) {
      return ['CHILD_ADDITION_FAILED'];
    }
    return ['CHILD_ADDED'];
  }

  getPerson(name) {
    return this.familyMap[name];
  }

  getSons(name) {
    const parent = this.getPerson(name);
    const children = parent.getChildren();
    if (children === undefined) {
      return [];
    }
    return children.filter((child) => child instanceof Male);
  }

  getDaughters(name) {
    const parent = this.getPerson(name);
    const children = parent.getChildren();
    if (children === undefined) {
      return [];
    }
    return children.filter((child) => child instanceof Female);
  }

  getSiblings(name) {
    const target = this.getPerson(name);
    const mother = target.getMother();
    if (mother === undefined) {
      return [];
    }
    const motherChildren = mother.getChildren();
    return motherChildren.filter((child) => child !== target);
  }

  getBrothers(name) {
    const siblings = this.getSiblings(name);
    return siblings.filter((sibling) => sibling instanceof Male);
  }

  getSisters(name) {
    const siblings = this.getSiblings(name);
    return siblings.filter((sibling) => sibling instanceof Female);
  }

  getSistersInLaw(name) {
    const siblings = this.getSiblings(name);
    if (siblings.length !== 0) {
      const brothersPartners = siblings.reduce((arr, sibling) => {
        if (sibling instanceof Male && sibling.getSpouse() !== undefined) {
          arr.push(sibling.getSpouse());
        }
        return arr;
      }, []);
      return brothersPartners;
    }

    const target = this.getPerson(name);
    const partner = target.getSpouse();
    if (partner === undefined) {
      return [];
    }
    return this.getSisters(partner.getName());
  }

  getBrothersInLaw(name) {
    const siblings = this.getSiblings(name);
    if (siblings.length !== 0) {
      const sistersPartners = siblings.reduce((acc, sibling) => {
        if (sibling instanceof Female && sibling.getSpouse() !== undefined) {
          acc.push(sibling.getSpouse());
        }
        return acc;
      }, []);
      return sistersPartners;
    };

    const target = this.getPerson(name);
    const partner = target.getSpouse();
    if (partner === undefined) {
      return [];
    }
    return this.getBrothers(partner.getName());
  }

  getMaternalAunts(name) {
    const target = this.getPerson(name);
    const mother = target.getMother();
    if (mother === undefined) {
      return [];
    }
    return this.getSisters(mother.getName());
  }

  getPaternalAunts(name) {
    const target = this.getPerson(name);
    const father = target.getFather();
    if (father === undefined) {
      return [];
    }
    return this.getSisters(father.getName());
  }

  getMaternalUncles(name) {
    const target = this.getPerson(name);
    const mother = target.getMother();
    if (mother === undefined) {
      return [];
    }
    return this.getBrothers(mother.getName());
  }

  getPaternalUncles(name) {
    const target = this.getPerson(name);
    const father = target.getFather();
    if (father === undefined) {
      return [];
    }
    return this.getBrothers(father.getName());
  }
}

module.exports = FamilyTree;
