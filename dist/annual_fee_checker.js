import { MatchedRecord } from "./matched_record.js";
import { Report } from "./report.js";
import * as Const from "./const.js";
import { TransactionMatcher } from "./transaction_matcher.js";
export class AnnualFeeChecker {
    check(members, transactions) {
        let unpaidMembers = [];
        let wrongAmountMembers = [];
        let paidMembers = [];
        members.forEach((member) => {
            const nameMatchedTransactions = new TransactionMatcher().matchTransactionByPayer(member, transactions);
            if (nameMatchedTransactions.length === 0) {
                unpaidMembers.push(member);
                return;
            }
            const correctAmountTransaction = nameMatchedTransactions.find((transaction) => {
                return Const.annualFee === transaction.amount;
            });
            if (correctAmountTransaction === undefined)
                wrongAmountMembers.push(new MatchedRecord(member, nameMatchedTransactions));
            else
                paidMembers.push(new MatchedRecord(member, [correctAmountTransaction]));
        });
        return new Report(unpaidMembers, wrongAmountMembers, [], [], paidMembers);
    }
}
//# sourceMappingURL=annual_fee_checker.js.map