import {Member} from "./member.js";
import {createTableData} from "./utils.js";

export class AbsentMemberRenderer{

    private tbody: Element;
    private span: Element;

    constructor(tbody:Element, span:Element) {
        this.tbody = tbody;
        this.span = span;
    }

    render(absentMembers: Array<Member>){
        this.tbody.innerHTML = "";

        absentMembers.forEach((member)=>{
            let tableRow = document.createElement("tr");
            const tableData = createTableData([
                member.nameInJapanese.lastName,
                member.nameInJapanese.firstName,
                member.childrenState.numChildren.toString(),
                member.childrenState.numAbsentChildren.toString()
            ])
            tableData.forEach(data => tableRow.append(data));
            this.tbody.append(tableRow);
        });

        this.span.textContent = absentMembers.length.toString();
    }
}