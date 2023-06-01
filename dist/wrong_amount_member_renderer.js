import { createSimpleDateString, createTableData } from "./utils.js";
export class WrongAmountMemberRenderer {
    constructor(tbody, span) {
        this.tbody = tbody;
        this.span = span;
    }
    render(matchedRecords) {
        this.tbody.innerHTML = "";
        matchedRecords.forEach((matchedRecord) => {
            let tableRow = document.createElement("tr");
            const member = matchedRecord.member;
            const transaction = matchedRecord.transactions[0];
            const difference = transaction.amount - member.childrenState.getQuarterlyTuition();
            const difText = difference < 0 ? Math.abs(difference).toString() + "不足" : difference.toString() + "余剰";
            const tableData = createTableData([
                member.nameInJapanese.lastName,
                member.nameInJapanese.firstName,
                member.partner.name.lastName,
                member.childrenState.getQuarterlyTuition().toString(),
                transaction.amount.toString(),
                difText,
                createSimpleDateString(transaction.date),
                transaction.payer,
                transaction.purpose
            ]);
            tableData.forEach(data => tableRow.append(data));
            this.tbody.append(tableRow);
        });
        this.span.textContent = matchedRecords.length.toString();
    }
}
//# sourceMappingURL=wrong_amount_member_renderer.js.map