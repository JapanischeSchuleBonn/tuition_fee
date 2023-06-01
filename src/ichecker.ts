import {Member} from "./member.js";
import {Transaction} from "./transaction.js";
import {Report} from "./report.js";

export interface IChecker {
    check: (members: Array<Member>, transactions: Array<Transaction> ) => Report
}
