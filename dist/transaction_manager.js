import { Transaction } from "./transaction.js";
export class TransactionManager {
    constructor(csvString) {
        const lines = csvString.split(/\r?\n/);
        lines.shift();
        this.transactions = [];
        lines.forEach((line) => {
            if (line === "")
                return;
            const elements = line.split(';');
            const date = this.parseDate(elements[0]);
            const payer = elements[1];
            const purpose = elements[2];
            const amount = parseFloat(elements[3]);
            this.transactions.push(new Transaction(date, payer, amount, purpose));
        });
        this.transactions.sort((a, b) => {
            if (a.date < b.date)
                return -1;
            else if (a.date > b.date)
                return 1;
            else
                return 0;
        });
    }
    parseDate(dateString) {
        const dateArray = dateString.split('.');
        let date = new Date();
        date.setDate(parseInt(dateArray[0]));
        date.setMonth(parseInt(dateArray[1]));
        date.setFullYear(parseInt(dateArray[2]));
        return date;
    }
    getNewestTransaction() {
        if (this.transactions.length === 0)
            return null;
        return this.transactions[this.transactions.length - 1];
    }
    getOldestTransaction() {
        if (this.transactions.length === 0)
            return null;
        return this.transactions[0];
    }
}
//# sourceMappingURL=transaction_manager.js.map