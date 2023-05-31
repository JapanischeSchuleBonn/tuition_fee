export class Transaction{
    public readonly date:Date;
    public readonly payer:string;
    public readonly amount:number;
    public readonly purpose:string;

    constructor(date:Date, payer:string, amount:number, purpose:string) {
        this.date = date;
        this.payer = payer;
        this.amount = amount;
        this.purpose = purpose;
    }
}
