import {Transaction} from "./transaction.js";
import * as Const from "./const.js";
import * as Utils from "./utils.js";

export class PropertyRenderer
{
    private readonly tbodyStatistics: Element;
    private readonly tbodyPrices: Element;

    constructor(tbodyStatistics:Element, tbodyPrices: Element) {
        this.tbodyStatistics = tbodyStatistics;
        this.tbodyPrices = tbodyPrices;
    }

    renderProperties(numMembers:number, numTransactions:number, oldestTransaction:Transaction, newestTransaction:Transaction)
    {
        this.renderStatistics(numMembers, numTransactions, oldestTransaction, newestTransaction);
        this.renderPrices();
    }

    private renderStatistics(numMembers:number, numTransactions:number, oldestTransaction:Transaction, newestTransaction:Transaction) {
        this.tbodyStatistics.innerHTML = "";
        let tableRow = document.createElement("tr");
        const tableData = Utils.createTableData([numMembers.toString(),
            numTransactions.toString(),
            Utils.createSimpleDateString(oldestTransaction.date),
            Utils.createSimpleDateString(newestTransaction.date)])
        tableData.forEach(data=>{ tableRow.append(data);});
        this.tbodyStatistics.append(tableRow);
    }

    private renderPrices() {
         this.tbodyPrices.innerHTML = "";
         let tableRow = document.createElement("tr");
        const tableData = Utils.createTableData([Const.annualFee.toString(),
            Const.tuition.toString(),
            Const.juniorClassTuition.toString(),
            Const.mathTuition.toString(),
            (-Const.discountUnit).toString(),
            (-Const.discountUnit * 2).toFixed(2).toString(),
            (-Const.discountUnit / 3 * 2).toFixed(2).toString(),
            (-Const.discountUnit * 2 / 3 * 2).toFixed(2).toString()]);
        tableData.forEach(data=>{ tableRow.append(data);});
        this.tbodyPrices.append(tableRow);
    }
}

