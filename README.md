# Shippit backend challenge

## Assumptions
---
### Inputs
- Expect input .txt file to have a number of commands (n) where __n <= 100__.
- Expect only .txt files.
- Expect names of family members must not have spaces i.e. "King Arthur" must instead be "King-Arthur".
- Expect new family members to have UNIQUE names. 

### User Commands
- The only commands to be handled are GET_RELATIONSHIP and ADD_CHILD
- For GET_RELATIONSHIP only the following relationships can be requested by user:
    - Siblings
    - Daughter
    - Son
    - Brother-In-Law
    - Sister-In-Law
    - Maternal-Aunt
    - Paternal-Aunt
    - Maternal-Uncle
    - Paternal-Uncle

### Model
- Models out the existing King Arthur Family Tree only
- User can only change the model through ADD_CHILD on existing members and GET_RELATIONSHIPS
- Existing relationships can not be changed (i.e. no divorce, seperation from parents etc.)
- No new spouse/marriage relationships can be established
- Relationship between members (marriage / spouse) must be binary (M & F)
- Only through mothers can a child be added to a family
- Children must be descendent from both a mother and father that are partnered
    - No half / step siblings
- Brothers/Sisters-In-Law will only output either spouse's siblings OR husbands
    - This is because the model only considers King Arthur's side of the family
## Model
---

### Data Structure
Family Tree is modelled using a tree data structure with each Person representing a node in the tree. A map data structure (JS Object) is used for constant-time access to a given Person in the tree using their name.

A Person instance has:
- Name: String representing their name
- Spouse: pointer to another Person 
- Mother: pointer to another Person
- Father: pointer to another Person
- Children: An array which may contain pointers to multiple Person objects

There are two subclasses that extend the Person:
- Male
- Female, which has the method of adding a child

### Time complexity

For a given family comprising of _**n**_ members, the time and space complexity of the required commands are:

GET_RELATIONSHIP - time complexity is O(n) and space complexity O(n):
- This applies only for supported relationships types: **siblings, siblings-in-law, uncles, aunts and children**
- O(1) to find target Person given their name using a map data structure
- O(1) to find target's parent or grandparent using pointers for Mother / Father
- O(1) to access the parent / grandparents children array
- O(n) to filter through required Person's from array. E.g. if they are Male / Female / have spouses
- O(n) space required as potentially all members in the tree can be in the 

ADD_CHILD - time complexity is O(1) and space complexity is O(1):
- O(1) to access mother node using map
- O(1) to create new child
- O(1) to push child into parent's children array
- O(1) space required to maintain pointers to mother and new child

## Build
---
### Local Development
- Clone the repo
    >`git clone git@github.com:ShippitRecruitment/backend-challenge_vjohndo.git`
- Change to submission branch if there is not a merge to main
    >`git checkout john/submission`
- Install dependencies
    >`npm i`
- Run Tests
    >`npm test`

## Using the app
---
### Running the app
- Running the app on the command line with a .txt file 
    >`node index.js <input-file-path>`

## Sample I/O
---
### Input .txt formats
- Input format to ADD_CHILD
    >`ADD_CHILD "Mother's-Name" "Child's-Name" "Gender"`
- Input format for GET_RELATIONSHIP
    >`GET_RELATIONSHIP "Name" "Relationship"`

### Example I/O:
- A __test.txt__ file contents:
    >`ADD_CHILD Flora Minerva Female`\
    >`GET_RELATIONSHIP Remus Maternal-Aunt`\
    >`GET_RELATIONSHIP Minerva Siblings`
- Run application with filepath in terminal:
    >`node index.js path/to/test.txt`
- Application will output in terminal:
    >`CHILD_ADDED`\
    >`Dominique Minerva`\
    >`Vitorie Dominique Louis`

## List of Dependencies
---
- Mocha: JS test framework
- Chai: Assertion library
- Sinon: Test doubling library
