import { createTableData } from "./utils.js";
export class InvalidMemberRenderer {
    constructor(tbody, span) {
        this.tbody = tbody;
        this.span = span;
    }
    render(members) {
        this.tbody.innerHTML = "";
        members.forEach((member) => {
            let tableRow = document.createElement("tr");
            const tableData = createTableData([
                member.nameInJapanese.lastName,
                member.nameInJapanese.firstName,
                member.childrenState.numChildren.toString(),
                member.childrenState.numAbsentChildren.toString()
            ]);
            tableData.forEach(data => tableRow.append(data));
            this.tbody.append(tableRow);
        });
        this.span.textContent = members.length.toString();
    }
}
//# sourceMappingURL=invalid_member_renderer.js.map