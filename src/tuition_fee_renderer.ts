import {IRenderer} from "./irenderer.js";
import {UnpaidMemberRenderer} from "./unpaid_member_renderer.js";
import {WrongAmountMemberRenderer} from "./wrong_amount_member_renderer.js";
import {ChildStateRenderer} from "./child_state_renderer.js";
import {PaidMemberRenderer} from "./paid_member_renderer.js";
import {Report} from "./report.js";

export class TuitionFeeRenderer implements IRenderer{

    private divResult: HTMLElement;

    constructor(divResult: HTMLElement) {
        this.divResult = divResult;
    }

    render(report: Report){
        this.divResult.style.display = null;

        (this.divResult.querySelector("div.unpaidMembers") as HTMLElement).style.display = null;
        const unpaidMemberRenderer = new UnpaidMemberRenderer(this.divResult.querySelector("tbody.unpaidMembers"), document.getElementById("unpaidMembersStat"));
        unpaidMemberRenderer.render(report.unpaidMembers);

        (this.divResult.querySelector("div.wrongAmountMembers") as HTMLElement).style.display = null;
        const wrongAmountMemberRenderer = new WrongAmountMemberRenderer(this.divResult.querySelector("tbody.wrongAmountMembers"),document.getElementById("wrongAmountMembersStat"));
        wrongAmountMemberRenderer.render(report.wrongAmountMembers);

        (this.divResult.querySelector("div.absentMembers") as HTMLElement).style.display = null;
        const absentMemberRenderer = new ChildStateRenderer(this.divResult.querySelector("tbody.absentMembers"), document.getElementById("absentMembersStat"));
        absentMemberRenderer.render(report.absentMembers);

        (this.divResult.querySelector("div.paidMembers") as HTMLElement).style.display = null;
        const paidMemberRenderer = new PaidMemberRenderer(this.divResult.querySelector("tbody.paidMembers"), document.getElementById("paidMembersStat"));
        paidMemberRenderer.render(report.paidMembers);

        (this.divResult.querySelector("div.invalidMembers") as HTMLElement).style.display = null;
        const invalidMemberRenderer = new ChildStateRenderer(this.divResult.querySelector("tbody.invalidMembers"), document.getElementById("invalidMembersStat"));
        invalidMemberRenderer.render(report.invalidMembers);
    }
}
