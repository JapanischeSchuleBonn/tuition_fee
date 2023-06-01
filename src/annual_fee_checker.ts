import {Member} from "./member.js";
import {Transaction} from "./transaction.js";
import {MatchedRecord} from "./matched_record.js";
import {Report} from "./report.js";
import {IChecker} from "./ichecker.js";
import * as Const from "./const.js";
import {TransactionMatcher} from "./transaction_matcher.js";

export class AnnualFeeChecker implements IChecker{

    check(members: Array<Member>, transactions: Array<Transaction>):Report {
        let unpaidMembers: Array<Member> = [];
        let wrongAmountMembers: Array<MatchedRecord> = [];
        let paidMembers: Array<MatchedRecord> = [];

        members.forEach((member) => {
            const nameMatchedTransactions = new TransactionMatcher().matchTransactionByPayer(member, transactions);

            if (nameMatchedTransactions.length === 0) {
                unpaidMembers.push(member);
                return;
            }

            const correctAmountTransaction = nameMatchedTransactions.find((transaction) => {
                return Const.annualFee === transaction.amount
            })

            if (correctAmountTransaction === undefined)
                wrongAmountMembers.push(new MatchedRecord(member, nameMatchedTransactions));
            else
                paidMembers.push(new MatchedRecord(member, [correctAmountTransaction]))
        });

        return new Report(unpaidMembers, wrongAmountMembers, [], [], paidMembers);
    }
}
