import {Member} from "./member.js";
import {createTableData} from "./utils.js";

export class UnpaidMemberRenderer{

    private tbody: Element;
    private span: Element;

    constructor(tbody: Element, span: Element) {
        this.tbody = tbody;
        this.span = span;
    }

    render(members: Array<Member>){
        this.tbody.innerHTML = "";

        members.forEach((member)=>{
            let tableRow = document.createElement("tr");
            const tableData = createTableData([member.nameInJapanese.lastName, member.nameInJapanese.firstName, member.partner.name.lastName]);
            tableData.forEach(data => tableRow.append(data));
            this.tbody.append(tableRow);
        });

        this.span.textContent = members.length.toString();
    }
}