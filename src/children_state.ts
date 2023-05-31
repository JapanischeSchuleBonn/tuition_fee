import * as Constant from "./const.js";

export class ChildrenState
{
    public readonly numChildren:number;
    public readonly numJuniorClass:number;
    public readonly numAbsentChildren:number;
    public readonly numMathTakingChildren:number;

    constructor(numChildren:number, numJuniorClass:number, numAbsentChildren:number, numMathTakingChildren:number) {
        this.numChildren = numChildren;
        this.numJuniorClass = numJuniorClass;
        this.numAbsentChildren = numAbsentChildren;
        this.numMathTakingChildren = numMathTakingChildren;
    }

    getQuarterlyTuition(): number
    {
        if(this.numChildren === this.numAbsentChildren)
            return 0.0;

        const numStudents = this.numChildren - this.numJuniorClass;
        const baseTuition = (numStudents * Constant.tuition) + (this.numJuniorClass * Constant.juniorClassTuition) + (this.numMathTakingChildren * Constant.mathTuition);

        let discount = 0.0;
        let juniorDiscountOffset = this.numChildren - this.numJuniorClass;
        for(let i = 1; i < this.numChildren; i++) {
            const juniorCorrection = i >= juniorDiscountOffset ? ( 2.0/3.0 ) : 1.0;
            discount += i * Constant.discountUnit * juniorCorrection;
        }

        return (baseTuition - discount) * 3;
    }
}
