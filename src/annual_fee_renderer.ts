import {IRenderer} from "./irenderer.js";
import {Report} from "./report.js";
import {UnpaidMemberRenderer} from "./unpaid_member_renderer.js";
import {WrongAmountMemberRenderer} from "./wrong_amount_member_renderer.js";
import {PaidMemberRenderer} from "./paid_member_renderer.js";
import * as Const from "./const.js"

export class AnnualFeeRenderer implements IRenderer{
    private divResult: HTMLElement;

    constructor(divResult: HTMLElement) {
        this.divResult = divResult;
    }

    render(report: Report){
        (this.divResult as HTMLElement).style.display = null;

        (this.divResult.querySelector("div.unpaidMembers") as HTMLElement).style.display = null;
        const unpaidMemberRenderer = new UnpaidMemberRenderer(this.divResult.querySelector("tbody.unpaidMembers"), document.getElementById("unpaidMembersStat"));
        unpaidMemberRenderer.render(report.unpaidMembers);

        (this.divResult.querySelector("div.wrongAmountMembers") as HTMLElement).style.display = null;
        const wrongAmountMemberRenderer = new WrongAmountMemberRenderer(this.divResult.querySelector("tbody.wrongAmountMembers"),
            document.getElementById("wrongAmountMembersStat"), Const.annualFee);
        wrongAmountMemberRenderer.render(report.wrongAmountMembers);

        (this.divResult.querySelector("div.absentMembers") as HTMLElement).style.display = "none";
        (this.divResult.querySelector("div.invalidMembers") as HTMLElement).style.display = "none";

        (this.divResult.querySelector("div.paidMembers") as HTMLElement).style.display = null;
        const paidMemberRenderer = new PaidMemberRenderer(this.divResult.querySelector("tbody.paidMembers"), document.getElementById("paidMembersStat"), Const.annualFee);
        paidMemberRenderer.render(report.paidMembers);
    }
}
