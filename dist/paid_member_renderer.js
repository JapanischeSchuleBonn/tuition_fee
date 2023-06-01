import { createSimpleDateString, createTableData } from "./utils.js";
export class PaidMemberRenderer {
    constructor(tbodyPaidMembers, spanPaidMembersStat) {
        this.renderPaidMembers = (matchedRecords) => {
            this.tbodyPaidMembers.innerHTML = "";
            matchedRecords.forEach((matchedRecord) => {
                let tableRow = document.createElement("tr");
                const member = matchedRecord.member;
                const transaction = matchedRecord.transactions[0];
                const tableData = createTableData([
                    member.nameInJapanese.lastName,
                    member.nameInJapanese.firstName,
                    member.partner.name.lastName,
                    member.childrenState.getQuarterlyTuition().toString(),
                    transaction.amount.toString(),
                    createSimpleDateString(transaction.date),
                    transaction.payer,
                    transaction.purpose
                ]);
                tableData.forEach(data => { tableRow.append(data); });
                this.tbodyPaidMembers.append(tableRow);
            });
            this.spanPaidMembersStat.textContent = matchedRecords.length.toString();
        };
        this.tbodyPaidMembers = tbodyPaidMembers;
        this.spanPaidMembersStat = spanPaidMembersStat;
    }
}
//# sourceMappingURL=paid_member_renderer.js.map