import {MatchedRecord} from "./matched_record.js";
import {createSimpleDateString, createTableData} from "./utils.js";
import {Highlighter} from "./highlighter";

export class PaidMemberRenderer{

    private tbody: Element;
    private span: Element;
    private readonly fixedAmount?: number
    private readonly highlighter?: Highlighter

    constructor(tbodyPaidMembers:Element, spanPaidMembersStat:Element, fixedAmount?: number, highlighter?: Highlighter) {
        this.tbody = tbodyPaidMembers;
        this.span = spanPaidMembersStat;
        this.fixedAmount = fixedAmount;
        this.highlighter = highlighter;
    }

     render = (matchedRecords: Array<MatchedRecord>)=>{
        this.tbody.innerHTML = "";

        matchedRecords.forEach((matchedRecord)=>{
            let tableRow = document.createElement("tr");
            const member = matchedRecord.member;
            const transaction = matchedRecord.transactions[0];
            const requiredAmount = this.fixedAmount ?? member.childrenState.getQuarterlyTuition();

            const processed = this.highlighter !== undefined ? this.highlighter.addHighlight(transaction.purpose) : transaction.purpose;

            const tableData = createTableData([
                member.nameInJapanese.lastName,
                member.nameInJapanese.firstName,
                member.partner.name.lastName,
                requiredAmount.toString(),
                transaction.amount.toString(),
                createSimpleDateString(transaction.date),
                transaction.payer,
                processed
            ]);
            tableData.forEach(data=>{ tableRow.append(data)});
            this.tbody.append(tableRow);
        });
        this.span.textContent = matchedRecords.length.toString();
    }
}