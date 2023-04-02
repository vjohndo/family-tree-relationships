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

    it('should log COMMAND_NOT_RECOGNISED if command is not supported', () => {
        const input = 'DO_SOMETHING aaa bbb ccc ddd eee';
        const expectedArgs = ['COMMAND_NOT_RECOGNISED'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log INCORRECT_NUM_ARGS if too many arguments for ADD_CHILD', () => {
        const input = 'ADD_CHILD Flora Mario Male Extra';
        const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_ADD_CHILD'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log INCORRECT_NUM_ARGS if not enough arguments for ADD_CHILD', () => {
        const input = 'ADD_CHILD Mario Male';
        const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_ADD_CHILD'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log INCORRECT_NUM_ARGS if too many arguments for GET_RELATIONSHIP', () => {
        const input = 'GET_RELATIONSHIP Minerva Random Siblings';
        const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_GET_RELATIONSHIP'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log INCORRECT_NUM_ARGS if not enough arguments for GET_RELATIONSHIP', () => {
        const input = 'GET_RELATIONSHIP Siblings';
        const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_GET_RELATIONSHIP'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log RELATIONSHIP_NOT_SUPPORTED if relationship type not supported', () => {
        const input = 'GET_RELATIONSHIP Arthur Super-Family';
        const expectedArgs = ['RELATIONSHIP_NOT_SUPPORTED'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });
});

describe('Family Tree Model', () => {

    let familyTree = initaliseFamilyTree();

    beforeEach(() => {
        sinon.stub(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
        familyTree = initaliseFamilyTree();
    });

    // it('should log the correct GET_RELATIONSHIP result for son when there are valid sons', () => {
    //     const input = 'GET_RELATIONSHIP Arthur Son';
    //     const expectedArgs = ['Bill Charlie Percy Ronald'];
    //     app.executeCommands(input, familyTree);
    //     const actualArgs = console.log.args[0];
    //     expect(actualArgs).to.eql(expectedArgs);
    // })

    it('should log PERSON_NOT_FOUND when ADD_CHILD to a Mother not in family', () => {
        const input = 'ADD_CHILD Luna Lola Female';
        const expectedArgs = ['PERSON_NOT_FOUND'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    })

    it('should log PERSON_NOT_FOUND when GET_RELATIONSHIP to a Person not in family', () => {
        const input = 'GET_RELATIONSHIP Luna Maternal-Aunt';
        const expectedArgs = ['PERSON_NOT_FOUND'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    })

    it('should log PERSON_NOT_FOUND if Mother is not in family tree', () => {
        const input = 'ADD_CHILD Luna Lola Female';
        const expectedArgs = ['PERSON_NOT_FOUND'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log NONE if person has no Siblings', () => {
        const input = 'GET_RELATIONSHIP Remus Siblings';
        const expectedArgs = ['NONE'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log CHILD_ADDITION_FAILED if ADD_CHILD on Male', () => {
        const input = 'ADD_CHILD Ted Bella Female'
        const expectedArgs = ['CHILD_ADDITION_FAILED']
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });
    

    it('should log the correct GET_RELATIONSHIP result for Maternal-Aunt', () => {
        const input = 'GET_RELATIONSHIP Remus Maternal-Aunt';
        const expectedArgs = ['Dominique'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log the correct GET_RELATIONSHIP result for Sister-In-Law', () => {
        const input = 'GET_RELATIONSHIP Lily Sister-In-Law';
        const expectedArgs = ['Darcy Alice'];
        app.executeCommands(input, familyTree);
        const actualArgs = console.log.args[0];
        expect(actualArgs).to.eql(expectedArgs);
    });

    it('should log the correct GET_RELATIONSHIP result for Maternal-Aunt after ADD_CHILD', () => {
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

    it('should log the correct GET_RELATIONSHIP results for Maternal-Aunt and Siblings after ADD_CHILD', () => {
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