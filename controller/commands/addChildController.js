const addChild = (args, familyTree) => {
    if (args.length !== 4) {
        console.log("INCORRECT_NUM_ARGS_FOR_ADD_CHILD");
        return
    }

    const [, mother, childName, childGender] = args

    if (!(mother in familyTree.map)) {
        console.log("PERSON_NOT_FOUND");
        return;
    }

    result = familyTree.addChild(mother, childName, childGender)
    console.log(result[0]);
}

module.exports = addChild;