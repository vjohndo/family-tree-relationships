const FamilyTree = require('./FamilyTree');

const initaliseFamilyTree = () => {
  const family = new FamilyTree();

  family.addNewMember('Arthur', 'Male');
  family.addPartner('Arthur', 'Margret', 'Female');
  family.addChild('Margret', 'Bill', 'Male');
  family.addChild('Margret', 'Charlie', 'Male');
  family.addChild('Margret', 'Percy', 'Male');
  family.addChild('Margret', 'Ronald', 'Male');
  family.addChild('Margret', 'Ginerva', 'Female');
  family.addPartner('Bill', 'Flora', 'Female');
  family.addPartner('Percy', 'Audrey', 'Female');
  family.addPartner('Ronald', 'Helen', 'Female');
  family.addPartner('Ginerva', 'Harry', 'Male');
  family.addChild('Flora', 'Victoire', 'Female');
  family.addChild('Flora', 'Dominique', 'Female');
  family.addChild('Flora', 'Louis', 'Male');
  family.addChild('Audrey', 'Molly', 'Female');
  family.addChild('Audrey', 'Lucy', 'Female');
  family.addChild('Helen', 'Rose', 'Female');
  family.addChild('Helen', 'Hugo', 'Male');
  family.addChild('Ginerva', 'James', 'Male');
  family.addChild('Ginerva', 'Albus', 'Male');
  family.addChild('Ginerva', 'Lily', 'Female');
  family.addPartner('Victoire', 'Ted', 'Male');
  family.addPartner('Rose', 'Malfoy', 'Male');
  family.addPartner('James', 'Darcy', 'Female');
  family.addPartner('Albus', 'Alice', 'Female');
  family.addChild('Victoire', 'Remus', 'Male');
  family.addChild('Rose', 'Draco', 'Male');
  family.addChild('Rose', 'Aster', 'Female');
  family.addChild('Darcy', 'William', 'Male');
  family.addChild('Alice', 'Ron', 'Male');
  family.addChild('Alice', 'Ginny', 'Female');

  return family;
};

module.exports = initaliseFamilyTree;
