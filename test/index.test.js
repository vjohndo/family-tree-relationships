const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const app = require('../index');

describe('Family Tree Command Executor', () => {
    // Should consider whether I want to stub or spy
    beforeEach(() => {
        sinon.stub(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
    });

    it('should correctly show child addition failure if ADD_CHILD on Male', () => {
        const input = 'ADD_CHILD Arthur Merlin Male'
        const expectedOutput = 'CHILD_ADDITION_FAILED'
        app.executeCommands(input);
        expect(console.log.calledWith(expectedOutput)).to.be.true;
    })

    it('should correctly output the GET_RELATIONSHIP result for  Maternal-Aunt', () => {
        const input = 'GET_RELATIONSHIP Remus Maternal-Aunt';
        const expectedOutput = 'Dominique';
        app.executeCommands(input);
        expect(console.log.calledWith(expectedOutput)).to.be.true;
    });

    it('should correctly output the GET_RELATIONSHIP result for Maternal-Aunt after ADD_CHILD', () => {
        const input = 'ADD_CHILD Flora Minerva Female\nGET_RELATIONSHIP Remus Maternal-Aunt';
        const expectedOutput = [
            'CHILD_ADDED',
            'Dominique Minerva'
        ];
        app.executeCommands(input);
        expectedOutput.forEach((output) => {
            expect(console.log.calledWith(output)).to.be.true;
        });
    });
});