const Person = require("../../models/Person");

const getRelationship = (args, familyTree) => {
    if (args.length !== 3) {
        console.log("INCORRECT_NUM_ARGS_FOR_GET_RELATIONSHIP");
        return;
    }

    const [, targetPerson, relationship] = args;

    if (!(targetPerson in familyTree.map)) {
        console.log("PERSON_NOT_FOUND");
        return;
    }

    if (relationship === "Maternal-Aunt") {
        const result = familyTree.getMaternalAunt(targetPerson);
        logOutput(result);
        return
    } 
    
    if (relationship === "Siblings") {
        const result = familyTree.getSiblings(targetPerson);
        logOutput(result);
        return
    } 
    
    if (relationship === "Sister-In-Law") {
        const result = familyTree.getSisterInLaw(targetPerson);
        logOutput(result);
        return
    }
    
    console.log("RELATIONSHIP_NOT_SUPPORTED");
}

const logOutput = (resultArr) => {
    if (resultArr.length === 0) {
        console.log("NONE");
    } else {
        console.log(resultArr.map(person => person.name).join(" "));
    }
    return
}

module.exports = getRelationship;