import {Member} from "./member.js";
import {MatchedRecord} from "./matched_record.js";

export class Report{
    public readonly unpaidMembers: Array<Member>;
    public readonly wrongAmountMembers: Array<MatchedRecord>;
    public readonly invalidMembers: Array<Member>;
    public readonly absentMembers: Array<Member>;
    public readonly paidMembers:Array<MatchedRecord>;

    constructor(unpaidMembers:Array<Member>, wrongAmountMembers:Array<MatchedRecord>, invalidMembers:Array<Member>, absentMembers:Array<Member>, paidMembers:Array<MatchedRecord>) {
        this.unpaidMembers = unpaidMembers;
        this.wrongAmountMembers = wrongAmountMembers;
        this.invalidMembers = invalidMembers;
        this.absentMembers = absentMembers;
        this.paidMembers = paidMembers;
    }
}
