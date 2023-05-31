class Name
{
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Person
{
    constructor(name, nameInJapanese) {
        this.name = name;
        this.nameInJapanese = nameInJapanese;
    }
}

class ChildrenState
{
    constructor(numChildren, numJuniorClass, numAbsentChildren, numMathTakingChildren) {
        this.numChildren = numChildren;
        this.numJuniorClass = numJuniorClass;
        this.numAbsentChildren = numAbsentChildren;
        this.numMathTakingChilderen = numMathTakingChildren;
    }

    getQuarterlyTuition()
    {
        if(this.numChildren === this.numAbsentChildren)
            return 0.0;

        const numStudents = this.numChildren - this.numJuniorClass;
        const baseTuition = (numStudents * tuition) + (this.numJuniorClass * juniorClassTuition) + (this.numMathTakingChilderen * mathTuition);

        let discount = 0.0;
        let juniorDiscountOffset = this.numChildren - this.numJuniorClass;
        for(let i = 1; i < this.numChildren; i++) {
            const juniorCorrection = i >= juniorDiscountOffset ? (2.0/3.0) : 1.0;
            discount += i * discountUnit * juniorCorrection;
        }

        return (baseTuition - discount) * 3;
    }

}

class Member extends Person
{
    constructor(id, name, nameInJapanese, partner, yearOfAdmission, childrenState) {
        super(name, nameInJapanese);
        this.id = id;
        this.partner = partner;
        this.yearOfAdmission = yearOfAdmission;
        this.childrenState = childrenState;
    }
}
