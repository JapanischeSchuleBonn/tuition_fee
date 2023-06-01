import {MemberManager} from "./member_manager.js";
import {TransactionManager} from "./transaction_manager.js";
import {TuitionChecker} from "./tuition_checker.js";
import {TuitionFeeRenderer} from "./tuition_fee_renderer.js";
import {Report} from "./report.js"
import {PropertyRenderer} from "./property_renderer.js";
import {PaidMemberRenderer} from "./paid_member_renderer.js";
import {ChildStateRenderer} from "./child_state_renderer.js";
import {WrongAmountMemberRenderer} from "./wrong_amount_member_renderer.js";
import {UnpaidMemberRenderer} from "./unpaid_member_renderer.js";
import {AnnualFeeChecker} from "./annual_fee_checker.js";
import {AnnualFeeRenderer} from "./annual_fee_renderer.js";
import {IChecker} from "./ichecker.js";
import {IRenderer} from "./irenderer.js";

let memberManager:MemberManager = null;
let transactionManager:TransactionManager = null;

const renderResult = (report: Report) =>{
    let divResult = document.getElementById("result");
    divResult.style.display = "block";

    const unpaidMemberRenderer = new UnpaidMemberRenderer(divResult.querySelector(".unpaidMembers"), document.getElementById("unpaidMembersStat"));
    unpaidMemberRenderer.render(report.unpaidMembers);

    const wrongAmountMemberRenderer = new WrongAmountMemberRenderer(divResult.querySelector(".wrongAmountMembers"),document.getElementById("wrongAmountMembersStat"));
    wrongAmountMemberRenderer.render(report.wrongAmountMembers);

    const absentMemberRenderer = new ChildStateRenderer(divResult.querySelector(".absentMembers"), document.getElementById("absentMembersStat"));
    absentMemberRenderer.render(report.absentMembers);

    const paidMemberRenderer = new PaidMemberRenderer(divResult.querySelector(".paidMembers"), document.getElementById("paidMembersStat"));
    paidMemberRenderer.render(report.paidMembers);

    const invalidMemberRenderer = new ChildStateRenderer(divResult.querySelector(".invalidMembers"), document.getElementById("invalidMembersStat"));
    invalidMemberRenderer.render(report.invalidMembers);
}

const execute = (event: Event) =>{
    const id = (event.target as HTMLTextAreaElement).id;

    document.getElementById("properties").style.display =  null;

    const propertyRenderer = new PropertyRenderer(document.getElementById("statistics"), document.getElementById("prices"));
    propertyRenderer.renderProperties(memberManager.members.length,
        transactionManager.transactions.length,
        transactionManager.getOldestTransaction(),
        transactionManager.getNewestTransaction());

    const divResult = document.getElementById("result") as HTMLElement
    const checker : IChecker = id === "tuitionCheckButton" ? new TuitionChecker() : new AnnualFeeChecker();
    const renderer : IRenderer = id === "tuitionCheckButton" ? new TuitionFeeRenderer(divResult) : new AnnualFeeRenderer(divResult);
    const report = checker.check(memberManager.members, transactionManager.transactions);
    renderer.render(report);
};


window.onload = ()=> {
    const memberListInput = document.getElementById("member_list_input");
    const bankTransactionsInput = document.getElementById("bank_transactions_input");
    memberListInput.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) { return; }
        const reader = new FileReader();
        reader.onload = (event) => {
            memberManager = new MemberManager(event.target.result.toString());
        };
        reader.readAsText(file);
    };

    bankTransactionsInput.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) { return; }
        const reader = new FileReader();
        reader.onload = (event) => {
            transactionManager = new TransactionManager(event.target.result.toString());
        };
        reader.readAsText(file);
    };

    const tuitionCheckButton = document.getElementById("tuitionCheckButton");
    tuitionCheckButton.onclick = execute;
    const annualFeeButton = document.getElementById("annualFeeButton");
    annualFeeButton.onclick = execute;
}
