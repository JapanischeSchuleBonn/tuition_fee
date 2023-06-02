import {MatchedRecord} from "./matched_record.js";
import {createSimpleDateString, createTableData} from "./utils.js";
import {Highlighter} from "./highlighter.js";

export class WrongAmountMemberRenderer{
    tbody: Element;
    span: Element;
    fixedAmount?: number;
    highlighter?: Highlighter;

    constructor(tbody:Element, span: Element, fixAmount?: number, highlighter?: Highlighter) {
        this.tbody = tbody;
        this.span = span;
        this.fixedAmount = fixAmount;
        this.highlighter = highlighter;
    }

    render(matchedRecords: Array<MatchedRecord>){
        this.tbody.innerHTML = "";

        matchedRecords.forEach((matchedRecord)=>{
            const member = matchedRecord.member;
            const transactions = matchedRecord.transactions;

            transactions.forEach((transaction, index)=> {
                let tableRow = document.createElement("tr");
                const requiredAmount = this.fixedAmount ?? member.childrenState.getQuarterlyTuition();
                const difference = transaction.amount - requiredAmount;
                const difText = difference < 0 ? Math.abs(difference).toString() + "不足" : difference.toString() + "余剰"

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


                if(transactions.length > 1){
                    if(index === 0) {
                        for (let i = 0; i < 4; ++i)
                            (tableData[i] as HTMLTableDataCellElement).rowSpan = transactions.length;
                    }else{
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
