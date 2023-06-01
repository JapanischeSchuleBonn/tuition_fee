import {Member} from "./member.js";
import {Transaction} from "./transaction.js";

export class TransactionMatcher {

    matchTransactionByPayer(member: Member, transactions: Array<Transaction>) {
        const name = member.name;
        const partnerName = member.partner.name;

        return transactions.filter((transaction: Transaction) => {
            const payer = transaction.payer.toUpperCase();
            const purpose = transaction.purpose.toUpperCase();

            if (payer.includes(name.firstName.toUpperCase()) && payer.includes(name.lastName.toUpperCase()))
                return true;
            else if (payer.includes(partnerName.firstName.toUpperCase()) && payer.includes(partnerName.lastName.toUpperCase()))
                return true;
            else if (purpose.includes(name.firstName.toUpperCase()) && purpose.includes(name.lastName.toUpperCase()))
                return true;
            else if (purpose.includes(partnerName.firstName.toUpperCase()) && purpose.includes(partnerName.lastName.toUpperCase()))
                return true;

            return false;
        })
    }
}
