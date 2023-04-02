const addChild = require("./commands/addChildController");
const getRelationship = require("./commands/getRelationshipController");

const executeCommand = (input, familyTree) => {
    const args = input.split(" ");
    const command = args[0];

    if (command === "ADD_CHILD") {
        addChild(args, familyTree);
    } else if (command === "GET_RELATIONSHIP") {
        getRelationship(args, familyTree);
    } else {
        console.log("COMMAND_NOT_RECOGNISED")
    }
}

module.exports = executeCommand;