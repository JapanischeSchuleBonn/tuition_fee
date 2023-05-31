
class MemberManager
{
    constructor(csvString) {
        const lines = csvString.split(/\r?\n/);
        lines.shift(); // remove the header
        this.members = [];

        const nanToZero = (input)=>{
            if (isNaN(input))
                return 0;
            else
                return input;
        }

        lines.forEach((line)=>{
            if(line === "")
                return;

            const elements = line.split(',');
            const id = parseInt(elements[0]);
            const yearOfAdmission = parseInt(elements[1]);
            const nameInJapanese = new Name(elements[3], elements[2]);
            const name = new Name(elements[5], elements[4]);

            const partnerName = new Name(elements[9], elements[8]);
            const partnerNameInJapanese = new Person(elements[14], elements[13]);
            const partner = new Person(partnerName, partnerNameInJapanese);

            const numChildren = nanToZero(parseInt(elements[10]));
            const numJuniorClass = nanToZero(parseInt(elements[11]));
            const numAbsentChildren = nanToZero(parseInt(elements[12]));
            const numMathTakingChildren = nanToZero(parseInt(elements[16]));
            const childrenState = new ChildrenState(numChildren, numJuniorClass, numAbsentChildren, numMathTakingChildren)
            const member = new Member(id, name, nameInJapanese, partner, yearOfAdmission, childrenState);
            this.members.push(member);
        });
    }
}
