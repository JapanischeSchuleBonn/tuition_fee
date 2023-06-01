import {Member} from "./member.js";
import {Transaction} from "./transaction.js";
import {MatchedRecord} from "./matched_record.js";
import {Report} from "./report.js";
import {IChecker} from "./ichecker.js";
import {TransactionMatcher} from "./transaction_matcher.js";

export class TuitionChecker implements IChecker{

    check(members: Array<Member>, transactions: Array<Transaction>):Report {
        let absentMembers: Array<Member> = [];
        let unpaidMembers: Array<Member> = [];
        let invalidMembers: Array<Member> = [];
        let wrongAmountMembers: Array<MatchedRecord> = [];
        let paidMembers: Array<MatchedRecord> = [];

        members.forEach((member) => {

            if ((member.childrenState.numChildren === member.childrenState.numAbsentChildren) && (member.childrenState.numChildren !== 0)) {
                absentMembers.push(member);
                return;
            }

            if ((member.childrenState.numChildren >= 2) && (member.childrenState.numAbsentChildren > 0) && (member.childrenState.numChildren != member.childrenState.numAbsentChildren)) {
                invalidMembers.push(member);
                return;
            }

            const nameMatchedTransactions = new TransactionMatcher().matchTransactionByPayer(member, transactions);

            if (nameMatchedTransactions.length === 0) {
                unpaidMembers.push(member);
                return;
            }

            const correctAmountTransaction = nameMatchedTransactions.find((transaction) => {
                return member.childrenState.getQuarterlyTuition() === transaction.amount
            })

            if (correctAmountTransaction === undefined)
                wrongAmountMembers.push(new MatchedRecord(member, nameMatchedTransactions));
            else
                paidMembers.push(new MatchedRecord(member, [correctAmountTransaction]))
        });

        return new Report(unpaidMembers, wrongAmountMembers, invalidMembers, absentMembers, paidMembers);
    }
}