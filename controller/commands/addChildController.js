const addChild = (args, familyTree) => {
  if (args.length !== 4) {
    console.log('INCORRECT_NUM_ARGS_FOR_ADD_CHILD');
    return;
  }

  const [, motherName, childName, childGender] = args;

  if (!familyTree.hasMember(motherName)) {
    console.log('PERSON_NOT_FOUND');
    return;
  }

  result = familyTree.addChild(motherName, childName, childGender);
  console.log(result[0]);
};

module.exports = addChild;
