const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const app = require('../index');

describe('Command Reader', () => {
    // Should consider whether I want to stub or spy
    beforeEach(() => {
        sinon.stub(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
    });

    it('should correctly read the command', () => {
        const input = 'GET_RELATIONSHIP Lily Sister-In-Law';
        const expectedOutput = 'GET_RELATIONSHIP';
        app.readCommands(input);
        expect(console.log.calledWith(expectedOutput)).to.be.true;
    });

    it('should correctly read multiple commands', () => {
        const input = 'GET_RELATIONSHIP Lily Sister-In-Law\nADD_CHILD Lily Sister-In-Law';
        const expectedOutput = [
            'GET_RELATIONSHIP',
            'ADD_CHILD'
        ];
        app.readCommands(input);
        expectedOutput.forEach((output) => {
            expect(console.log.calledWith(output)).to.be.true;
        });
    });
});