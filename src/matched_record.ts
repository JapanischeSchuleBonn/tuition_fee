import {Member} from "./member.js";
import {Transaction} from "./transaction.js";

export class MatchedRecord{

    public readonly member:Member;
    public readonly transactions:Array<Transaction>;

    constructor(member:Member, transactions:Array<Transaction>) {
        this.member = member;
        this.transactions = transactions;
    }
}
