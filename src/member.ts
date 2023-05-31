import {Person} from "./person.js";
import {Name} from "./name.js";
import {ChildrenState} from "./children_state.js";

export class Member extends Person
{
    public readonly id:number;
    public readonly partner:Person;
    public readonly yearOfAdmission:number;
    public readonly childrenState:ChildrenState;

    constructor(id:number, name:Name, nameInJapanese:Name, partner:Person, yearOfAdmission:number, childrenState:ChildrenState) {
        super(name, nameInJapanese);
        this.id = id;
        this.partner = partner;
        this.yearOfAdmission = yearOfAdmission;
        this.childrenState = childrenState;
    }
}
