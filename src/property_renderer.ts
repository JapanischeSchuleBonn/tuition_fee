import {Transaction} from "./transaction.js";
import * as Const from "./const.js";

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
        tableRow.append(this.createElement("td", numMembers.toString()));
        tableRow.append(this.createElement("td", numTransactions.toString()));
        tableRow.append(this.createElement("td", oldestTransaction.date.toISOString().split('T')[0]));
        tableRow.append(this.createElement("td", newestTransaction.date.toISOString().split('T')[0]));
        this.tbodyStatistics.append(tableRow);
    }

    private renderPrices() {
         this.tbodyPrices.innerHTML = "";
         let tableRow = document.createElement("tr");
         tableRow.append(this.createElement("td", Const.annualFee.toString()));
         tableRow.append(this.createElement("td", Const.tuition.toString()));
         tableRow.append(this.createElement("td", Const.juniorClassTuition.toString()));
         tableRow.append(this.createElement("td", Const.mathTuition.toString()));
         tableRow.append(this.createElement("td", (-Const.discountUnit).toString()));
         tableRow.append(this.createElement("td", (-Const.discountUnit * 2).toFixed(2).toString()));
         tableRow.append(this.createElement("td", (-Const.discountUnit / 3 * 2).toFixed(2).toString()));
         tableRow.append(this.createElement("td", (-Const.discountUnit * 2 / 3 * 2).toFixed(2).toString()));
         this.tbodyPrices.append(tableRow);
    }

    private createElement(tag:string, content:string){
        let element = document.createElement(tag);
        element.append(content);
        return element;
    }
}

