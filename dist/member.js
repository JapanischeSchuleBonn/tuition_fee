import { Person } from "./person.js";
export class Member extends Person {
    constructor(id, name, nameInJapanese, partner, yearOfAdmission, childrenState) {
        super(name, nameInJapanese);
        this.id = id;
        this.partner = partner;
        this.yearOfAdmission = yearOfAdmission;
        this.childrenState = childrenState;
    }
}
//# sourceMappingURL=member.js.map