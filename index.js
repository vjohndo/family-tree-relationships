const fs = require('fs');
const execute = require("./controller/commandController");
const familyTree = require("./models/InitialiseFamilyTree")();

const executeCommands = (input, familyTree) => {
    const commands = input.split('\n');
    commands.forEach((command) => {
        try {
            execute(command, familyTree);
        } catch (error) {
            console.error(`Error evaluating expression: ${command}`);
            console.error(error.message);
        }
    });
}

const main = () => {
    if (process.argv.length !== 3) {
        console.error('Usage: node index.js <inputfile>');
        process.exit(1);
    }
    const inputFile = process.argv[2];
    try {
        const input = fs.readFileSync(inputFile, 'utf8');
        executeCommands(input, familyTree);
    } catch (error) {
        console.error(`Error reading input file: ${inputFile}`);
        console.error(error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    executeCommands: executeCommands,
    main: main
};