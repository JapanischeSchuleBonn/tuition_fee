import {Transaction} from "./transaction.js";

export class TransactionManager
{
    public readonly transactions: Array<Transaction>;

    constructor(csvString:string ) {
        const lines = csvString.split(/\r?\n/);
        lines.shift(); // remove the header
        this.transactions = [];

        lines.forEach((line: string)=>{
            if(line === "")
                return;

            const elements = line.split(';');
            const date = this.parseDate(elements[0]);
            const payer = elements[1];
            const purpose = elements[2];
            const amount = parseFloat(elements[3]);
            this.transactions.push(new Transaction(date, payer, amount, purpose));
        });

        this.transactions.sort((a, b)=> {
            if( a.date < b.date)
                return -1;
            else if( a.date > b.date)
                return 1;
            else
                return 0;
        })
    }

    parseDate(dateString:string) {
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
        return this.transactions[this.transactions.length-1];
    }

    getOldestTransaction() {
        if (this.transactions.length === 0)
            return null;
        return this.transactions[0];
    }
}
