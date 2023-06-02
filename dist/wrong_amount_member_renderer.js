import { createSimpleDateString, createTableData } from "./utils.js";
export class WrongAmountMemberRenderer {
    constructor(tbody, span, fixAmount, highlighter) {
        this.tbody = tbody;
        this.span = span;
        this.fixedAmount = fixAmount;
        this.highlighter = highlighter;
    }
    render(matchedRecords) {
        this.tbody.innerHTML = "";
        matchedRecords.forEach((matchedRecord) => {
            const member = matchedRecord.member;
            const transactions = matchedRecord.transactions;
            transactions.forEach((transaction, index) => {
                var _a;
                let tableRow = document.createElement("tr");
                const requiredAmount = (_a = this.fixedAmount) !== null && _a !== void 0 ? _a : member.childrenState.getQuarterlyTuition();
                const difference = transaction.amount - requiredAmount;
                const difText = difference < 0 ? Math.abs(difference).toString() + "不足" : difference.toString() + "余剰";
                const processed = this.highlighter === undefined ? transaction.purpose :
                    this.highlighter.addHighlight(transaction.purpose);
                const tableData = createTableData([
                    member.nameInJapanese.lastName,
                    member.nameInJapanese.firstName,
                    member.partner.name.lastName,
                    requiredAmount.toString(),
                    transaction.amount.toString(),
                    difText,
                    createSimpleDateString(transaction.date),
                    transaction.payer,
                    processed
                ]);
                if (transactions.length > 1) {
                    if (index === 0) {
                        for (let i = 0; i < 4; ++i)
                            tableData[i].rowSpan = transactions.length;
                    }
                    else {
                        for (let i = 0; i < 4; ++i)
                            tableData.shift();
                    }
                }
                tableData.forEach(data => tableRow.append(data));
                this.tbody.append(tableRow);
            });
        });
        this.span.textContent = matchedRecords.length.toString();
    }
}
//# sourceMappingURL=wrong_amount_member_renderer.js.map