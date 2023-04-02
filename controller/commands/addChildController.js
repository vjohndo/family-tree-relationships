const addChild = (args, familyTree) => {
    // Input error handling for add child goes here.

    result = familyTree.addChild(args[1], args[2], args[3])
    console.log(result);
}

module.exports = addChild;