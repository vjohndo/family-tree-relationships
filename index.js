const fs = require('fs');
const execute = require("./controller/executeCommand")

function executeCommands(input) {
    const commands = input.split('\n');
    commands.forEach((command) => {
        try {
            execute(command);
        } catch (error) {
            console.error(`Error evaluating expression: ${command}`);
            console.error(error.message);
        }
    });
}

function main() {
    if (process.argv.length !== 3) {
        console.error('Usage: node index.js <inputfile>');
        process.exit(1);
    }
    const inputFile = process.argv[2];
    try {
        // ReadFile vs readfilesync
        const input = fs.readFileSync(inputFile, 'utf8');
        executeCommands(input);
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