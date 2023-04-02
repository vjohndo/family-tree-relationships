const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const app = require('../index');
const initaliseFamilyTree = require('../models/InitialiseFamilyTree');

describe('Input handling', () => {
    let familyTree = initaliseFamilyTree();

    beforeEach(() => {
        sinon.stub(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
        familyTree = initaliseFamilyTree();
    });

    it('should correctly log COMMAND_NOT_RECOGNISED if command is not supported', () => {
        const input = 'DO_SOMETHING aaa bbb ccc ddd eee';
        const expectedArgs = ['COMMAND_NOT_RECOGNISED'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should correctly log INCORRECT_NUM_ARGS if too many arguments for GET_RELATIONSHIP', () => {
        const input = 'GET_RELATIONSHIP Minerva Random Siblings';
        const expectedArgs = ['INCORRECT_NUM_ARGS'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should correctly log INCORRECT_NUM_ARGS if not enough arguments for GET_RELATIONSHIP', () => {
        const input = 'GET_RELATIONSHIP Siblings';
        const expectedArgs = ['INCORRECT_NUM_ARGS'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should correctly log RELATIONSHIP_NOT_SUPPORTED if relationship type not supported', () => {
        const input = 'GET_RELATIONSHIP Arthur Super-Family';
        const expectedArgs = ['RELATIONSHIP_NOT_SUPPORTED'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });
})

describe('Family Tree Model', () => {

    let familyTree = initaliseFamilyTree();

    beforeEach(() => {
        sinon.stub(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
        familyTree = initaliseFamilyTree();
    });

    it('should correctly log PERSON_NOT_FOUND if Mother is not in family tree', () => {
        const input = 'ADD_CHILD Luna Lola Female';
        const expectedArgs = ['PERSON_NOT_FOUND'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should correctly log CHILD_ADDITION_FAILED if ADD_CHILD on Male', () => {
        const input = 'ADD_CHILD Arthur Merlin Male'
        const expectedArgs = ['CHILD_ADDITION_FAILED']
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });
    

    it('should correctly log the GET_RELATIONSHIP result for Maternal-Aunt', () => {
        const input = 'GET_RELATIONSHIP Remus Maternal-Aunt';
        const expectedArgs = ['Dominique'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should correctly log the GET_RELATIONSHIP result for Maternal-Aunt after ADD_CHILD', () => {
        const input = 'ADD_CHILD Flora Minerva Female\nGET_RELATIONSHIP Remus Maternal-Aunt';
        const expectedArgs = [
            ['CHILD_ADDED'],
            ['Dominique Minerva']
        ];
        app.executeCommands(input, familyTree);
        for (const [index, actualArg] of console.log.args.entries()) {
            expect(actualArg).to.eql(expectedArgs[index])
        }
    });

    it('should correctly log the GET_RELATIONSHIP results for Maternal-Aunt and Siblings after ADD_CHILD', () => {
        const input = 'ADD_CHILD Flora Minerva Female\nGET_RELATIONSHIP Remus Maternal-Aunt\nGET_RELATIONSHIP Minerva Siblings';
        const expectedArgs = [
            ['CHILD_ADDED'],
            ['Dominique Minerva'],
            ['Victorie Dominique Louis'],
        ];
        app.executeCommands(input, familyTree);
        for (const [index, actualArg] of console.log.args.entries()) {
            expect(actualArg).to.eql(expectedArgs[index])
        }
    });
});