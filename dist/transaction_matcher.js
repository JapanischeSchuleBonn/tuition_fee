export class TransactionMatcher {
    matchTransactionByPayer(member, transactions) {
        const name = member.name;
        const partnerName = member.partner.name;
        return transactions.filter((transaction) => {
            const payer = transaction.payer.toUpperCase();
            const purpose = transaction.purpose.toUpperCase();
            if (payer.includes(name.firstName.toUpperCase()) && payer.includes(name.lastName.toUpperCase()))
                return true;
            else if (purpose.includes(name.firstName.toUpperCase()) && purpose.includes(name.lastName.toUpperCase()))
                return true;
            if (partnerName.isFullNameKnown()) {
                if (payer.includes(partnerName.firstName.toUpperCase()) && payer.includes(partnerName.lastName.toUpperCase()))
                    return true;
                if (purpose.includes(partnerName.firstName.toUpperCase()) && purpose.includes(partnerName.lastName.toUpperCase()))
                    return true;
            }
            if (partnerName.isOnlyLastNameKnown()) {
                if (payer.includes(partnerName.lastName.toUpperCase()))
                    return true;
            }
            return false;
        });
    }
}
//# sourceMappingURL=transaction_matcher.js.map