import {MatchedRecord} from "./matched_record.js";
import {createSimpleDateString, createTableData} from "./utils.js";

export class PaidMemberRenderer{

    private tbody: Element;
    private span: Element;

    constructor(tbodyPaidMembers:Element, spanPaidMembersStat:Element) {
        this.tbody = tbodyPaidMembers;
        this.span = spanPaidMembersStat;
    }

     renderPaidMembers = (matchedRecords: Array<MatchedRecord>)=>{
        this.tbody.innerHTML = "";

        matchedRecords.forEach((matchedRecord)=>{
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
            tableData.forEach(data=>{ tableRow.append(data)});
            this.tbody.append(tableRow);
        });
        this.span.textContent = matchedRecords.length.toString();
    }
}