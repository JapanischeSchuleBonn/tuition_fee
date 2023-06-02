import {IRenderer} from "./irenderer.js";
import {Report} from "./report.js";
import {UnpaidMemberRenderer} from "./unpaid_member_renderer.js";
import {WrongAmountMemberRenderer} from "./wrong_amount_member_renderer.js";
import {PaidMemberRenderer} from "./paid_member_renderer.js";
import * as Const from "./const.js"
import {Highlighter} from "./highlighter.js";

export class AnnualFeeRenderer implements IRenderer{
    private divResult: HTMLElement;

    constructor(divResult: HTMLElement) {
        this.divResult = divResult;
    }

    render(report: Report){
        (this.divResult as HTMLElement).style.display = null;

        (this.divResult.querySelector("div.unpaidMembers") as HTMLElement).style.display = null;
        const tbodyUnpaidMembers = this.divResult.querySelector("tbody.unpaidMembers");
        const spanUnpaidMembersStat = document.getElementById("unpaidMembersStat");
        const unpaidMemberRenderer = new UnpaidMemberRenderer(tbodyUnpaidMembers, spanUnpaidMembersStat);
        unpaidMemberRenderer.render(report.unpaidMembers);

        (this.divResult.querySelector("div.wrongAmountMembers") as HTMLElement).style.display = null;
        const tbodyWrongAmountMembers = this.divResult.querySelector("tbody.wrongAmountMembers");
        const spanWrongAmountMembersStat = document.getElementById("wrongAmountMembersStat");
        const wrongAmountMemberRenderer = new WrongAmountMemberRenderer(tbodyWrongAmountMembers,
            spanWrongAmountMembersStat, Const.annualFee, new Highlighter("nenkaihi"));
        wrongAmountMemberRenderer.render(report.wrongAmountMembers);

        (this.divResult.querySelector("div.paidMembers") as HTMLElement).style.display = null;
        const tbodyPaidMembers = this.divResult.querySelector("tbody.paidMembers");
        const spanPaidMembersStat = document.getElementById("paidMembersStat");
        const paidMemberRenderer = new PaidMemberRenderer(tbodyPaidMembers, spanPaidMembersStat, Const.annualFee, new Highlighter("nenkaihi"));
        paidMemberRenderer.render(report.paidMembers);

        (this.divResult.querySelector("div.absentMembers") as HTMLElement).style.display = "none";
        (this.divResult.querySelector("div.invalidMembers") as HTMLElement).style.display = "none";
    }
}
