import { createSimpleDateString, createTableData } from "./utils.js";
export class PaidMemberRenderer {
    constructor(tbodyPaidMembers, spanPaidMembersStat, fixedAmount) {
        this.render = (matchedRecords) => {
            this.tbody.innerHTML = "";
            matchedRecords.forEach((matchedRecord) => {
                var _a;
                let tableRow = document.createElement("tr");
                const member = matchedRecord.member;
                const transaction = matchedRecord.transactions[0];
                const requiredAmount = (_a = this.fixedAmount) !== null && _a !== void 0 ? _a : member.childrenState.getQuarterlyTuition();
                const tableData = createTableData([
                    member.nameInJapanese.lastName,
                    member.nameInJapanese.firstName,
                    member.partner.name.lastName,
                    requiredAmount.toString(),
                    transaction.amount.toString(),
                    createSimpleDateString(transaction.date),
                    transaction.payer,
                    transaction.purpose
                ]);
                tableData.forEach(data => { tableRow.append(data); });
                this.tbody.append(tableRow);
            });
            this.span.textContent = matchedRecords.length.toString();
        };
        this.tbody = tbodyPaidMembers;
        this.span = spanPaidMembersStat;
        this.fixedAmount = fixedAmount;
    }
}
//# sourceMappingURL=paid_member_renderer.js.map