import { createTableData } from "./utils.js";
export class UnpaidMemberRenderer {
    constructor(tbody, span) {
        this.tbody = tbody;
        this.span = span;
    }
    render(members) {
        this.tbody.innerHTML = "";
        members.forEach((member) => {
            let tableRow = document.createElement("tr");
            const tableData = createTableData([member.nameInJapanese.lastName, member.nameInJapanese.firstName, member.partner.name.lastName]);
            tableData.forEach(data => tableRow.append(data));
            this.tbody.append(tableRow);
        });
        this.span.textContent = members.length.toString();
    }
}
//# sourceMappingURL=unpaid_member_renderer.js.map