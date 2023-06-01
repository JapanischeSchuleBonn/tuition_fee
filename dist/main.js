import { MemberManager } from "./member_manager.js";
import { TransactionManager } from "./transaction_manager.js";
import { MatchedRecord } from "./matched_record.js";
import { Report } from "./report.js";
import { PropertyRenderer } from "./property_renderer.js";
import { PaidMemberRenderer } from "./paid_member_renderer.js";
import { AbsentMemberRenderer } from "./absent_member_renderer.js";
import { WrongAmountMemberRenderer } from "./wrong_amount_member_renderer.js";
let memberManager = null;
let transactionManager = null;
const renderAbsentMembers = (tableAbsentMembers, absentMembersStat, absentMembers) => {
    tableAbsentMembers.innerHTML = "";
    absentMembers.forEach((member) => {
        let tableRow = document.createElement("tr");
        let tableDataLastNameInJapanese = document.createElement("td");
        tableDataLastNameInJapanese.append(member.nameInJapanese.lastName);
        tableRow.append(tableDataLastNameInJapanese);
        let tableDataFirstNameInJapanese = document.createElement("td");
        tableDataFirstNameInJapanese.append(member.nameInJapanese.firstName);
        tableRow.append(tableDataFirstNameInJapanese);
        let tableDataNumChildren = document.createElement("td");
        tableDataNumChildren.append(member.childrenState.numChildren.toString());
        tableRow.append(tableDataNumChildren);
        let tableDataNumAbsentChildren = document.createElement("td");
        tableDataNumAbsentChildren.append(member.childrenState.numAbsentChildren.toString());
        tableRow.append(tableDataNumAbsentChildren);
        tableAbsentMembers.append(tableRow);
    });
    absentMembersStat.textContent = " (" + absentMembers.length.toString() + "/" + memberManager.members.length.toString() + ")";
};
const renderUnpaidMembers = (tableUnpaidMembers, unpaidMembersStat, unpaidMembers) => {
    tableUnpaidMembers.innerHTML = "";
    unpaidMembers.forEach((member) => {
        let tableRow = document.createElement("tr");
        let tableDataLastNameInJapanese = document.createElement("td");
        tableDataLastNameInJapanese.append(member.nameInJapanese.lastName);
        tableRow.append(tableDataLastNameInJapanese);
        let tableDataFirstNameInJapanese = document.createElement("td");
        tableDataFirstNameInJapanese.append(member.nameInJapanese.firstName);
        tableRow.append(tableDataFirstNameInJapanese);
        let tableDataPartnerLastName = document.createElement("td");
        tableDataPartnerLastName.append(member.partner.name.lastName);
        tableRow.append(tableDataPartnerLastName);
        tableUnpaidMembers.append(tableRow);
    });
    unpaidMembersStat.textContent = " (" + unpaidMembers.length.toString() + "/" + memberManager.members.length.toString() + ")";
};
const renderInvalidMembers = (tablePaidMembers, invalidMembersStat, members) => {
};
const renderResult = (report) => {
    let divTuitionFeeResult = document.getElementById("tuition_fee_result");
    let divAnnualFeeResult = document.getElementById("annual_fee_result");
    divTuitionFeeResult.style.display = "block";
    divAnnualFeeResult.style.display = "none";
    renderUnpaidMembers(divTuitionFeeResult.querySelector(".unpaidMembers"), document.getElementById("unpaidMembersStat"), report.unpaidMembers);
    const wrongAmountMemberRenderer = new WrongAmountMemberRenderer(divTuitionFeeResult.querySelector(".wrongAmountMembers"), document.getElementById("wrongAmountMembersStat"));
    wrongAmountMemberRenderer.render(report.wrongAmountMembers);
    const absentMemberRenderer = new AbsentMemberRenderer(divTuitionFeeResult.querySelector(".absentMembers"), document.getElementById("absentMembersStat"));
    absentMemberRenderer.render(report.absentMembers);
    const paidMemberRenderer = new PaidMemberRenderer(divTuitionFeeResult.querySelector(".paidMembers"), document.getElementById("paidMembersStat"));
    paidMemberRenderer.render(report.paidMembers);
    renderInvalidMembers(divTuitionFeeResult.querySelector(".invalidMembers"), document.getElementById("invalidMembersStat"), report.invalidMembers);
};
const executeTuitionCalculation = () => {
    let absentMembers = Array();
    let unpaidMembers = Array();
    let invalidMembers = Array();
    let wrongAmountMembers = Array();
    let paidMembers = Array();
    memberManager.members.forEach((member) => {
        const name = member.name;
        const partnerName = member.partner.name;
        if (member.childrenState.numChildren === member.childrenState.numAbsentChildren && member.childrenState.numChildren !== 0) {
            absentMembers.push(member);
            return;
        }
        const nameMatchedTransactions = transactionManager.transactions.filter((transaction) => {
            const payer = transaction.payer.toUpperCase();
            const purpose = transaction.purpose.toUpperCase();
            if (payer.includes(name.firstName.toUpperCase()) && payer.includes(name.lastName.toUpperCase()))
                return true;
            else if (payer.includes(partnerName.firstName.toUpperCase()) && payer.includes(partnerName.lastName.toUpperCase()))
                return true;
            else if (purpose.includes(name.firstName.toUpperCase()) && purpose.includes(name.lastName.toUpperCase()))
                return true;
            else if (purpose.includes(partnerName.firstName.toUpperCase()) && purpose.includes(partnerName.lastName.toUpperCase()))
                return true;
            return false;
        });
        if (nameMatchedTransactions.length === 0) {
            unpaidMembers.push(member);
            return;
        }
        const correctAmountTransaction = nameMatchedTransactions.find((transaction) => {
            return member.childrenState.getQuarterlyTuition() === transaction.amount;
        });
        if (correctAmountTransaction === undefined)
            wrongAmountMembers.push(new MatchedRecord(member, nameMatchedTransactions));
        else
            paidMembers.push(new MatchedRecord(member, [correctAmountTransaction]));
    });
    const divProperties = document.getElementById("properties");
    divProperties.style.display = null;
    const propertyRenderer = new PropertyRenderer(document.getElementById("statistics"), document.getElementById("prices"));
    propertyRenderer.renderProperties(memberManager.members.length, transactionManager.transactions.length, transactionManager.getOldestTransaction(), transactionManager.getNewestTransaction());
    renderResult(new Report(unpaidMembers, wrongAmountMembers, invalidMembers, absentMembers, paidMembers));
};
const executeAnnualFeeCalculation = () => {
};
window.onload = () => {
    const memberListInput = document.getElementById("member_list_input");
    const bankTransactionsInput = document.getElementById("bank_transactions_input");
    memberListInput.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            memberManager = new MemberManager(event.target.result.toString());
        };
        reader.readAsText(file);
    };
    bankTransactionsInput.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            transactionManager = new TransactionManager(event.target.result.toString());
        };
        reader.readAsText(file);
    };
    const tuitionCheckButton = document.getElementById("tuitionCheckButton");
    tuitionCheckButton.onclick = executeTuitionCalculation;
    const annualFeeButton = document.getElementById("annualFeeButton");
    annualFeeButton.onclick = executeAnnualFeeCalculation;
};
//# sourceMappingURL=main.js.map