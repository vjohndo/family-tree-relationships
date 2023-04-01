const initaliseFamilyTree = require("../models/InitialiseFamilyTree");
const familyTree = initaliseFamilyTree();

const executeCommand = (command) => {
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
            console.log(familyTree.getMaternalAunt(args[1]));
        }
    }
}

module.exports = executeCommand;