class MatchedRecord{
    constructor(member, transactions) {
        this.member = member;
        this.transactions = transactions;
    }
}

class Report{
    constructor() {
        this.notPaidMembers = [];
        this.wrongAmountMembers = [];
        this.invalidMembers = [];
        this.absentMembers = [];
        this.paidMembers = [];
    }
}
