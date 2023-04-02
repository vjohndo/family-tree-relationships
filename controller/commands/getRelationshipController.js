const getRelationship = (args, familyTree) => {
    // Input error handling for getRelationship goes here
    if (args.length !== 3) {
        console.log("INCORRECT_NUM_ARGS");
        return
    }

    const targetPerson = args[1];
    const relationship = args[2];
    
    switch(relationship) {
        case "Maternal-Aunt":
            console.log(familyTree.getMaternalAunt(targetPerson));
            break;
        case "Siblings":
            console.log(familyTree.getSiblings(targetPerson));
            break;
        default:
            console.log("RELATIONSHIP_NOT_SUPPORTED");
    }
}

module.exports = getRelationship;