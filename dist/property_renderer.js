import * as Const from "./const.js";
export class PropertyRenderer {
    constructor(tbodyStatistics, tbodyPrices) {
        this.tbodyStatistics = tbodyStatistics;
        this.tbodyPrices = tbodyPrices;
    }
    renderProperties(numMembers, numTransactions, oldestTransaction, newestTransaction) {
        this.renderStatistics(numMembers, numTransactions, oldestTransaction, newestTransaction);
        this.renderPrices();
    }
    renderStatistics(numMembers, numTransactions, oldestTransaction, newestTransaction) {
        this.tbodyStatistics.innerHTML = "";
        let tableRow = document.createElement("tr");
        tableRow.append(this.createElement("td", numMembers.toString()));
        tableRow.append(this.createElement("td", numTransactions.toString()));
        tableRow.append(this.createElement("td", oldestTransaction.date.toISOString().split('T')[0]));
        tableRow.append(this.createElement("td", newestTransaction.date.toISOString().split('T')[0]));
        this.tbodyStatistics.append(tableRow);
    }
    renderPrices() {
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
    createElement(tag, content) {
        let element = document.createElement(tag);
        element.append(content);
        return element;
    }
}
//# sourceMappingURL=property_renderer.js.map