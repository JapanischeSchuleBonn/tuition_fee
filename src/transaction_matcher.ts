import {Member} from "./member.js";
import {Transaction} from "./transaction.js";

export class TransactionMatcher {

    matchTransactionByPayer(member: Member, transactions: Array<Transaction>) {
        const name = member.name;
        const partnerName = member.partner.name;

        return transactions.filter((transaction: Transaction) => {
            const payer = transaction.payer.toUpperCase();
            const purpose = transaction.purpose.toUpperCase();

            // from member's account
            if (payer.includes(name.firstName.toUpperCase()) && payer.includes(name.lastName.toUpperCase()))
                return true;

            // from member's company's account
            else if (purpose.includes(name.firstName.toUpperCase()) && purpose.includes(name.lastName.toUpperCase()))
                return true;

            // partner's full name is known
            if(partnerName.isFullNameKnown()){

                // from partner's account
                if(payer.includes(partnerName.firstName.toUpperCase()) && payer.includes(partnerName.lastName.toUpperCase()))
                    return true;

                // from partner's company account
                if(purpose.includes(partnerName.firstName.toUpperCase()) && purpose.includes(partnerName.lastName.toUpperCase()))
                    return true;
            }

            // partner's last name is known
            if(partnerName.isOnlyLastNameKnown()) {
                // payer is member's name + partner's last name // MAY BE VOLATILE
                if(payer.includes(partnerName.lastName.toUpperCase()))
                    return true;
            }
            return false;
        })
    }
}
