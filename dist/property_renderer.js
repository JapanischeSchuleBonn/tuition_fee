import * as Const from "./const.js";
import * as Utils from "./utils.js";
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
        const tableData = Utils.createTableData([numMembers.toString(),
            numTransactions.toString(),
            Utils.createSimpleDateString(oldestTransaction.date),
            Utils.createSimpleDateString(newestTransaction.date)]);
        tableData.forEach(data => { tableRow.append(data); });
        this.tbodyStatistics.append(tableRow);
    }
    renderPrices() {
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
        tableData.forEach(data => { tableRow.append(data); });
        this.tbodyPrices.append(tableRow);
    }
}
//# sourceMappingURL=property_renderer.js.map