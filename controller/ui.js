import initaliseFamilyTree from "../models/InitialiseFamilyTree"

const executeCommand = (command) => {
    const familyTree = initaliseFamilyTree();

    args = command.split(" ");

    if (args[0] === "ADD_CHILD") {
        result = familyTree.addChild(args[1], args[2], args[3])
        if (result === 0) {
            console.log("CHILD_ADDED");
        } else {
            console.log("CHILD_ADDITION_FAILED");
        }
    }

    if (args[0] === "GET_RELATIONSHIP") {
        if (args[2] === "Maternal-Aunt") {
            familyTree.getMaternalAunt(args[1]);
        }
    }
}

module.exports = executeCommand;