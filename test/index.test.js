const {expect} = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const app = require('../index');
const initaliseFamilyTree = require('../models/InitialiseFamilyTree');

describe('Input Contoller ', () => {
  let familyTree = initaliseFamilyTree();

  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
    familyTree = initaliseFamilyTree();
  });

  it('should log ' +
      'COMMAND_NOT_RECOGNISED if command is not supported', () => {
    const input = 'DO_SOMETHING aaa bbb ccc ddd eee';
    const expectedArgs = ['COMMAND_NOT_RECOGNISED'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'INCORRECT_NUM_ARGS if too many arguments for ADD_CHILD', () => {
    const input = 'ADD_CHILD Flora Mario Male Extra';
    const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_ADD_CHILD'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'INCORRECT_NUM_ARGS if not enough arguments for ADD_CHILD', () => {
    const input = 'ADD_CHILD Mario Male';
    const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_ADD_CHILD'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'INCORRECT_NUM_ARGS if too many arguments for GET_RELATIONSHIP', () => {
    const input = 'GET_RELATIONSHIP Minerva Random Siblings';
    const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_GET_RELATIONSHIP'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'INCORRECT_NUM_ARGS if not enough arguments for GET_RELATIONSHIP', () => {
    const input = 'GET_RELATIONSHIP Siblings';
    const expectedArgs = ['INCORRECT_NUM_ARGS_FOR_GET_RELATIONSHIP'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'RELATIONSHIP_NOT_SUPPORTED if relationship type not supported', () => {
    const input = 'GET_RELATIONSHIP Arthur Super-Family';
    const expectedArgs = ['RELATIONSHIP_NOT_SUPPORTED'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });
});

describe('Family Tree Model When Getting Relationships', () => {
  let familyTree = initaliseFamilyTree();

  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
    familyTree = initaliseFamilyTree();
  });

  it('should log ' +
      'correct GET_RELATIONSHIP result ' +
      'when the target person can not be found in family tree', () => {
    const input = 'GET_RELATIONSHIP Luna Maternal-Aunt';
    const expectedArgs = ['PERSON_NOT_FOUND'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result ' +
      'for Daughter when there are valid daughters', () => {
    const input = 'GET_RELATIONSHIP Flora Daughter';
    const expectedArgs = ['Victoire Dominique'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result ' +
      'for Daughter when there are no valid daughters', () => {
    const input =
      'GET_RELATIONSHIP Molly Daughter\n' +
      'GET_RELATIONSHIP Victoire Daughter';
    const expectedArgs = [
      ['NONE'],
      ['NONE'],
    ];
    app.executeCommands(input, familyTree);
    for (const [index, actualArg] of console.log.args.entries()) {
      expect(actualArg).to.eql(expectedArgs[index]);
    }
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result ' +
      'for Son when there are valid sons', () => {
    const input = 'GET_RELATIONSHIP Arthur Son';
    const expectedArgs = ['Bill Charlie Percy Ronald'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result ' +
      'for Son when there are no valid sons', () => {
    const input =
      'GET_RELATIONSHIP Percy Son\n' +
      'GET_RELATIONSHIP Aster Son';
    const expectedArgs = [
      ['NONE'],
      ['NONE'],
    ];
    app.executeCommands(input, familyTree);
    for (const [index, actualArg] of console.log.args.entries()) {
      expect(actualArg).to.eql(expectedArgs[index]);
    }
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Sibling when there are no valid siblings', () => {
    const input = 'GET_RELATIONSHIP Remus Siblings';
    const expectedArgs = ['NONE'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Sibling when there are valid siblings', () => {
    const input = 'GET_RELATIONSHIP Ginerva Siblings';
    const expectedArgs = ['Bill Charlie Percy Ronald'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result ' +
      'for Sister-In-Law when there are no valid sisters-in-law', () => {
    const input = 'GET_RELATIONSHIP Malfoy Sister-In-Law';
    const expectedArgs = ['NONE'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result ' +
      'for Sister-In-Law when there are valid brothers spouses', () => {
    const input = 'GET_RELATIONSHIP Lily Sister-In-Law';
    const expectedArgs = ['Darcy Alice'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Sister-In-Law when there are valid spouses sisters', () => {
    const input = 'GET_RELATIONSHIP Ted Sister-In-Law';
    const expectedArgs = ['Dominique'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Brother-In-Law when there are no valid brothers-in-law', () => {
    const input = 'GET_RELATIONSHIP Molly Brother-In-Law';
    const expectedArgs = ['NONE'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Brother-In-Law when there are valid sisters spouses', () => {
    const input = 'GET_RELATIONSHIP Louis Brother-In-Law';
    const expectedArgs = ['Ted'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Brother-In-Law when there are vlid spouses brothers', () => {
    const input = 'GET_RELATIONSHIP Darcy Brother-In-Law';
    const expectedArgs = ['Albus'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Maternal-Aunt when there are no valid maternal-aunts', () => {
    const input = 'GET_RELATIONSHIP Rose Maternal-Aunt';
    const expectedArgs = ['NONE'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Maternal-Aunt when there are valid maternal-aunts', () => {
    const input = 'GET_RELATIONSHIP Remus Maternal-Aunt';
    const expectedArgs = ['Dominique'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Paternal-Aunt when there are no valid paternal-aunts', () => {
    const input = 'GET_RELATIONSHIP Ronald Paternal-Aunt';
    const expectedArgs = ['NONE'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Paternal-Aunt when there are valid paternal-aunts', () => {
    const input = 'GET_RELATIONSHIP Ginny Paternal-Aunt';
    const expectedArgs = ['Lily'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Maternal-Uncle when there are no valid maternal-uncles', () => {
    const input = 'GET_RELATIONSHIP Lucy Maternal-Uncle';
    const expectedArgs = ['NONE'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Maternal-Uncle when there are valid maternal-uncles', () => {
    const input = 'GET_RELATIONSHIP James Maternal-Uncle';
    const expectedArgs = ['Bill Charlie Percy Ronald'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Paternal-Uncle when there are no valid paternal-uncles', () => {
    const input = 'GET_RELATIONSHIP Aster Paternal-Uncle';
    const expectedArgs = ['NONE'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP result for ' +
      'Paternal-Uncle when there are valid paternal-uncles', () => {
    const input = 'GET_RELATIONSHIP Molly Paternal-Uncle';
    const expectedArgs = ['Bill Charlie Ronald'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });
});

describe('Family Tree Model When Adding Child', () => {
  let familyTree = initaliseFamilyTree();

  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
    familyTree = initaliseFamilyTree();
  });


  it('should log ' +
      'PERSON_NOT_FOUND when ADD_CHILD to a Mother not in family', () => {
    const input = 'ADD_CHILD Luna Lola Female';
    const expectedArgs = ['PERSON_NOT_FOUND'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log ' +
      'PERSON_NOT_FOUND when ADD_CHILD if Mother is not in family tree', () => {
    const input = 'ADD_CHILD Luna Lola Female';
    const expectedArgs = ['PERSON_NOT_FOUND'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log CHILD_ADDITION_FAILED when ADD_CHILD with existing member name', () => {
    const input = 'ADD_CHILD Aster Ted Male';
    const expectedArgs = ['CHILD_ADDITION_FAILED'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log CHILD_ADDITION_FAILED when ADD_CHILD on spouseless member', () => {
    const input = 'ADD_CHILD Aster Bella Female';
    const expectedArgs = ['CHILD_ADDITION_FAILED'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log CHILD_ADDITION_FAILED when ADD_CHILD on Male', () => {
    const input = 'ADD_CHILD Ted Bella Female';
    const expectedArgs = ['CHILD_ADDITION_FAILED'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });

  it('should log the correct GET_RELATIONSHIP result after ADD_CHILD', () => {
    const input =
      'ADD_CHILD Flora Minerva Female\n' +
      'GET_RELATIONSHIP Remus Maternal-Aunt';
    const expectedArgs = [
      ['CHILD_ADDED'],
      ['Dominique Minerva'],
    ];
    app.executeCommands(input, familyTree);
    for (const [index, actualArg] of console.log.args.entries()) {
      expect(actualArg).to.eql(expectedArgs[index]);
    }
  });

  it('should log ' +
      'the correct GET_RELATIONSHIP results for ' +
      'multiple requests after ADD_CHILD', () => {
    const input =
      'ADD_CHILD Flora Minerva Female\n' +
      'GET_RELATIONSHIP Remus Maternal-Aunt\n' +
      'GET_RELATIONSHIP Minerva Siblings';
    const expectedArgs = [
      ['CHILD_ADDED'],
      ['Dominique Minerva'],
      ['Victoire Dominique Louis'],
    ];
    app.executeCommands(input, familyTree);
    for (const [index, actualArg] of console.log.args.entries()) {
      expect(actualArg).to.eql(expectedArgs[index]);
    }
  });
});

describe('Family Tree Model When Reading From .txt File', () => {
  let familyTree = initaliseFamilyTree();

  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
    familyTree = initaliseFamilyTree();
  });


  it('should log ' +
      'correct output from valid text file ' +
      'with ADD_CHILD and GET_RELATIONSHIP', () => {
    const input = fs.readFileSync('test/samples/sample0.txt', 'utf8');
    const expectedArgs = [
      ['CHILD_ADDED'],
      ['Dominique Minerva'],
      ['Victoire Dominique Louis'],
    ];
    app.executeCommands(input, familyTree);
    for (const [index, actualArg] of console.log.args.entries()) {
      expect(actualArg).to.eql(expectedArgs[index]);
    }
  });

  it('should log ' +
      'correct output from valid text file ' +
      'when target person can not be found', () => {
    const input = fs.readFileSync('test/samples/sample1.txt', 'utf8');
    const expectedArgs = [
      ['PERSON_NOT_FOUND'],
      ['PERSON_NOT_FOUND'],
    ];
    app.executeCommands(input, familyTree);
    for (const [index, actualArg] of console.log.args.entries()) {
      expect(actualArg).to.eql(expectedArgs[index]);
    }
  });

  it('should log ' +
      'correct output from valid text file ' +
      'when child addition fails and if no relationships exists', () => {
    const input = fs.readFileSync('test/samples/sample2.txt', 'utf8');
    const expectedArgs = [
      ['CHILD_ADDITION_FAILED'],
      ['NONE'],
    ];
    app.executeCommands(input, familyTree);
    for (const [index, actualArg] of console.log.args.entries()) {
      expect(actualArg).to.eql(expectedArgs[index]);
    }
  });

  it('should log ' +
      'correct output from valid text file with GET_RELATIONSHIP', () => {
    const input = fs.readFileSync('test/samples/sample3.txt', 'utf8');
    const expectedArgs = ['Darcy Alice'];
    app.executeCommands(input, familyTree);
    const actualArgs = console.log.args[0];
    expect(actualArgs).to.eql(expectedArgs);
  });
});
