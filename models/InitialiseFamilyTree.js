const FamilyTree = require("./FamilyTree");
const Person = require("./Person");

const initaliseFamilyTree = () => {
    const family = new FamilyTree();
    const arthur = new Person("King Arthur", "male");
    const margret = new Person("Queen Margret", "female");
    family.map["King Arthur"] = arthur
    family.map["Queen Margret"] = margret
    arthur.makePartner(margret);

    family.addChild("Queen Margret", "Bill", "Male");
    family.addChild("Queen Margret", "Charlie", "Male");
    family.addChild("Queen Margret", "Percy", "Male");
    family.addChild("Queen Margret", "Ronald", "Male");
    family.addChild("Queen Margret", "Ginerva", "Female");
    family.addPartner("Bill", "Flora", "Female");
    family.addPartner("Percy", "Audrey", "Female");
    family.addPartner("Ronald", "Helen", "Female");
    family.addPartner("Ginerva", "Harry", "Male");

    family.addChild("Flora", "Victorie", "Female");
    family.addChild("Flora", "Dominique", "Female");
    family.addChild("Flora", "Louis", "Male");
    family.addChild("Audrey", "Molly", "Female");
    family.addChild("Audrey", "Lucy", "Female");
    family.addChild("Helen", "Rose", "Female");
    family.addChild("Helen", "Hugo", "Male");
    family.addChild("Ginerva", "James", "Male");
    family.addChild("Ginerva", "Albus", "Male");
    family.addChild("Ginerva", "Lily", "Female");
    family.addPartner("Victorie", "Ted", "Male");
    family.addPartner("Rose", "Malfoy", "Male");
    family.addPartner("James", "Darcy", "Female");
    family.addPartner("Albus", "Alice", "Female");

    family.addChild("Victorie", "Remus", "Male");
    family.addChild("Rose", "Draco", "Male");
    family.addChild("Rose", "Aster", "Female");
    family.addChild("Darcy", "William", "Male");
    family.addChild("Alice", "Ron", "Male");
    family.addChild("Alice", "Ginny", "Female");

    return family;
}

initaliseFamilyTree();

module.exports = initaliseFamilyTree;