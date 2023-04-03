const getRelationship = (args, familyTree) => {
  if (args.length !== 3) {
    console.log('INCORRECT_NUM_ARGS_FOR_GET_RELATIONSHIP');
    return;
  }

  const [, targetName, relationship] = args;

  if (!familyTree.hasMember(targetName)) {
    console.log('PERSON_NOT_FOUND');
    return;
  }

  if (relationship === 'Son') {
    const result = familyTree.getSons(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Daughter') {
    const result = familyTree.getDaughters(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Siblings') {
    const result = familyTree.getSiblings(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Sister-In-Law') {
    const result = familyTree.getSistersInLaw(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Brother-In-Law') {
    const result = familyTree.getBrothersInLaw(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Maternal-Aunt') {
    const result = familyTree.getMaternalAunts(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Paternal-Aunt') {
    const result = familyTree.getPaternalAunts(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Maternal-Uncle') {
    const result = familyTree.getMaternalUncles(targetName);
    logOutput(result);
    return;
  }

  if (relationship === 'Paternal-Uncle') {
    const result = familyTree.getPaternalUncles(targetName);
    logOutput(result);
    return;
  }

  console.log('RELATIONSHIP_NOT_SUPPORTED');
};

const logOutput = (resultArr) => {
  if (resultArr.length === 0) {
    console.log('NONE');
  } else {
    console.log(resultArr.map((person) => person.getName()).join(' '));
  }
  return;
};

module.exports = getRelationship;
