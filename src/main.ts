import {MemberManager} from "./member_manager.js";
import {TransactionManager} from "./transaction_manager.js";
import {Member} from "./member.js";
import {MatchedRecord} from "./matched_record.js";
import {Transaction} from "./transaction.js";
import {Report} from "./report.js"
import {PropertyRenderer} from "./property_renderer.js";
import {PaidMemberRenderer} from "./paid_member_renderer.js";
import {ChildStateRenderer} from "./child_state_renderer.js";
import {WrongAmountMemberRenderer} from "./wrong_amount_member_renderer.js";
import {UnpaidMemberRenderer} from "./unpaid_member_renderer.js";

let memberManager:MemberManager = null;
let transactionManager:TransactionManager = null;

const renderResult = (report: Report) =>{
    let divTuitionFeeResult = document.getElementById("tuition_fee_result");
    let divAnnualFeeResult = document.getElementById("annual_fee_result");
    divTuitionFeeResult.style.display = "block";
    divAnnualFeeResult.style.display = "none";

    const unpaidMemberRenderer = new UnpaidMemberRenderer(divTuitionFeeResult.querySelector(".unpaidMembers"), document.getElementById("unpaidMembersStat"));
    unpaidMemberRenderer.render(report.unpaidMembers);

    const wrongAmountMemberRenderer = new WrongAmountMemberRenderer(divTuitionFeeResult.querySelector(".wrongAmountMembers"),document.getElementById("wrongAmountMembersStat"));
    wrongAmountMemberRenderer.render(report.wrongAmountMembers);

    const absentMemberRenderer = new ChildStateRenderer(divTuitionFeeResult.querySelector(".absentMembers"), document.getElementById("absentMembersStat"));
    absentMemberRenderer.render(report.absentMembers);

    const paidMemberRenderer = new PaidMemberRenderer(divTuitionFeeResult.querySelector(".paidMembers"), document.getElementById("paidMembersStat"));
    paidMemberRenderer.render(report.paidMembers);

    const invalidMemberRenderer = new ChildStateRenderer(divTuitionFeeResult.querySelector(".invalidMembers"), document.getElementById("invalidMembersStat"));
    invalidMemberRenderer.render(report.invalidMembers);
}

const executeTuitionCalculation= () =>{

    let absentMembers = Array<Member>();
    let unpaidMembers = Array<Member>();
    let invalidMembers = Array<Member>();
    let wrongAmountMembers = Array<MatchedRecord>();
    let paidMembers = Array<MatchedRecord>();

    memberManager.members.forEach((member) => {
        const name = member.name;
        const partnerName = member.partner.name;

        if((member.childrenState.numChildren === member.childrenState.numAbsentChildren) && (member.childrenState.numChildren !== 0)){
            absentMembers.push(member);
            return;
        }

        if((member.childrenState.numChildren >= 2) && (member.childrenState.numAbsentChildren > 0) && (member.childrenState.numChildren != member.childrenState.numAbsentChildren)){
            invalidMembers.push(member);
            return;
        }

        const nameMatchedTransactions = transactionManager.transactions.filter((transaction:Transaction) =>{
            const payer = transaction.payer.toUpperCase();
            const purpose = transaction.purpose.toUpperCase();

            if(payer.includes(name.firstName.toUpperCase()) && payer.includes(name.lastName.toUpperCase()))
                return true;
            else if(payer.includes(partnerName.firstName.toUpperCase()) && payer.includes(partnerName.lastName.toUpperCase()))
                return true;
            else if(purpose.includes(name.firstName.toUpperCase()) && purpose.includes(name.lastName.toUpperCase()))
                return true;
            else if(purpose.includes(partnerName.firstName.toUpperCase()) && purpose.includes(partnerName.lastName.toUpperCase()))
                return true;

            return false;
        })

        if (nameMatchedTransactions.length === 0) {
            unpaidMembers.push(member);
            return;
        }

        const correctAmountTransaction = nameMatchedTransactions.find((transaction) =>{
            return member.childrenState.getQuarterlyTuition() === transaction.amount
        })

        if(correctAmountTransaction === undefined)
            wrongAmountMembers.push(new MatchedRecord(member, nameMatchedTransactions));
        else
            paidMembers.push(new MatchedRecord(member, [correctAmountTransaction]))
    });

    const divProperties = document.getElementById("properties");
    divProperties.style.display = null;

    const propertyRenderer = new PropertyRenderer(document.getElementById("statistics"), document.getElementById("prices"));
    propertyRenderer.renderProperties(memberManager.members.length,
        transactionManager.transactions.length,
        transactionManager.getOldestTransaction(),
        transactionManager.getNewestTransaction());

    renderResult(new Report(unpaidMembers, wrongAmountMembers, invalidMembers, absentMembers, paidMembers ));
};

const executeAnnualFeeCalculation= () => {

}

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
    tuitionCheckButton.onclick = executeTuitionCalculation;
    const annualFeeButton = document.getElementById("annualFeeButton");
    annualFeeButton.onclick = executeAnnualFeeCalculation;
}
