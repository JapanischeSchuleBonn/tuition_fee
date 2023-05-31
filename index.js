let memberManager = null;
let transactionManager = null;

const renderAbsentMembers = (absentMembers)=>{
    let table = document.getElementById("absentMembers");
    table.innerHTML = "<tr><th class='name'>性</th><th class='name'>名</th><th class='amount'>子弟数</th><th class='amount'>うち休学</th></tr>";

    absentMembers.forEach((member)=>{
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

        table.append(tableRow);
    });
}

const renderNotPaidMembers = (notPaidMembers)=>{
    let table = document.getElementById("notPaidMembers");
    table.innerHTML = "<tr><th class='name'>性</th><th class='name'>名</th><th class='name'>パートナー性</th>";

    notPaidMembers.forEach((member)=>{
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

        table.append(tableRow);
    });
}

const renderWrongAmountMembers = (matchedRecord)=>{

    let table = document.getElementById("wrongAmountMembers");
    table.innerHTML = "<tr><th class='name'>性</th><th class='name'>名</th><th class='name'>パートナー性</th><th class='amount'>請求金額</th><th class='amount'>振込金額</th><th class='amount'>誤差</th><th>振込日時</th><th>振込名義人</th><th class='note'>備考欄</th></tr>";

    matchedRecord.forEach((matchedRecord)=>{
        let tableRow = document.createElement("tr");
        const member = matchedRecord.member;
        const transaction = matchedRecord.transactions[0];

        let tableDataLastNameInJapanese = document.createElement("td");
        tableDataLastNameInJapanese.append(member.nameInJapanese.lastName);
        tableRow.append(tableDataLastNameInJapanese);

        let tableDataFirstNameInJapanese = document.createElement("td");
        tableDataFirstNameInJapanese.append(member.nameInJapanese.firstName);
        tableRow.append(tableDataFirstNameInJapanese);

        let tableDataPartnerLastName = document.createElement("td");
        tableDataPartnerLastName.append(member.partner.name.lastName);
        tableRow.append(tableDataPartnerLastName);

        let tableDataRequiredAmount = document.createElement("td");
        tableDataRequiredAmount.classList.add("amount")
        tableDataRequiredAmount.append(member.childrenState.getQuarterlyTuition());
        tableRow.append(tableDataRequiredAmount);

        let tableDataPaidAmount = document.createElement("td");
        tableDataPaidAmount.classList.add("amount")
        tableDataPaidAmount.append(transaction.amount.toString());
        tableRow.append(tableDataPaidAmount);

        let tableDataDifference = document.createElement("td");
        tableDataDifference.classList.add("amount")
        const difference = transaction.amount - member.childrenState.getQuarterlyTuition();
        const difText = difference < 0 ? Math.abs(difference).toString() + "不足" : difference.toString() + "余剰"
        tableDataDifference.append(difText);
        tableRow.append(tableDataDifference);

        let tableDataDate = document.createElement("td");
        tableDataDate.append(transaction.date.toISOString().split('T')[0]);
        tableRow.append(tableDataDate);

        let tableDataPayerName = document.createElement("td");
        tableDataPayerName.append(transaction.payer);
        tableRow.append(tableDataPayerName);

        let tableDataPurpose = document.createElement("td");
        tableDataPurpose.append(transaction.purpose.toString());
        tableRow.append(tableDataPurpose);

        table.append(tableRow);
    });
}
const renderInvalidMembers = (members) =>{

}

const renderPaidMembers = (matchedRecord)=>{
    let table = document.getElementById("paidMembers");
    table.innerHTML = "<tr><th class='name'>性</th><th class='name'>名</th><th class='name'>パートナー性</th><th class='amount'>請求金額</th><th class='amount'>振込金額</th><th>振込日時</th><th>振込名義人</th><th class='note'>備考欄</th></tr>";

    matchedRecord.forEach((matchedRecord)=>{
        let tableRow = document.createElement("tr");
        const member = matchedRecord.member;
        const transaction = matchedRecord.transactions[0];

        let tableDataLastNameInJapanese = document.createElement("td");
        tableDataLastNameInJapanese.append(member.nameInJapanese.lastName);
        tableRow.append(tableDataLastNameInJapanese);

        let tableDataFirstNameInJapanese = document.createElement("td");
        tableDataFirstNameInJapanese.append(member.nameInJapanese.firstName);
        tableRow.append(tableDataFirstNameInJapanese);

        let tableDataPartnerLastName = document.createElement("td");
        tableDataPartnerLastName.append(member.partner.name.lastName);
        tableRow.append(tableDataPartnerLastName);

        let tableDataRequiredAmount = document.createElement("td");
        tableDataRequiredAmount.classList.add("amount")
        tableDataRequiredAmount.append(member.childrenState.getQuarterlyTuition());
        tableRow.append(tableDataRequiredAmount);

        let tableDataPaidAmount = document.createElement("td");
        tableDataPaidAmount.classList.add("amount")
        tableDataPaidAmount.append(transaction.amount.toString());
        tableRow.append(tableDataPaidAmount);

        let tableDataDate = document.createElement("td");
        tableDataDate.append(transaction.date.toISOString().split('T')[0]);
        tableRow.append(tableDataDate);

        let tableDataPayerName = document.createElement("td");
        tableDataPayerName.append(transaction.payer);
        tableRow.append(tableDataPayerName);

        let tableDataPurpose = document.createElement("td");
        tableDataPurpose.append(transaction.purpose.toString());
        tableRow.append(tableDataPurpose);

        table.append(tableRow);
    });
}

const renderResult = (report) =>{
    renderWrongAmountMembers(report.wrongAmountMembers);
    renderNotPaidMembers(report.notPaidMembers);
    renderAbsentMembers(report.absentMembers);
    renderPaidMembers(report.paidMembers);
    renderInvalidMembers(report.invalidMembers);
}

const renderDataProperties =(numMembers, numTransactions, oldestTransaction, newestTransaction) =>{
    let table = document.getElementById("dataProperties");
    table.innerHTML = "<tr><th>対象会員数</th><th>対象振込件数</th><th>最も古い振込</th><th>最も新しい振込</th></tr>";
    let tableRow = document.createElement("tr");
    let tableDataNumMembers = document.createElement("td");
    tableDataNumMembers.append(numMembers);
    tableRow.append(tableDataNumMembers);

    let tableDataNumTransactions = document.createElement("td");
    tableDataNumTransactions.append(numTransactions);
    tableRow.append(tableDataNumTransactions);

    let tableDataOldestTransaction = document.createElement("td");
    tableDataOldestTransaction.append(oldestTransaction.date.toISOString().split('T')[0]);
    tableRow.append(tableDataOldestTransaction);

    let tableDataNewestTransaction = document.createElement("td");
    tableDataNewestTransaction.append(newestTransaction.date.toISOString().split('T')[0]);
    tableRow.append(tableDataNewestTransaction);

    table.append(tableRow);
}

const executeOperation = () =>{
    let report = new Report();
    memberManager.members.forEach((member) => {
        const name = member.name;
        const partnerName = member.partner.name;

        if(member.childrenState.numChildren === member.childrenState.numAbsentChildren && member.childrenState.numChildren !== 0){
            report.absentMembers.push(member);
            return;
        }

        const nameMatchedTransactions = transactionManager.transactions.filter((transaction) =>{
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
            report.notPaidMembers.push(member);
            return;
        }

        const correctAmountTransaction = nameMatchedTransactions.find((transaction) =>{
            return member.childrenState.getQuarterlyTuition() === transaction.amount
        })
        if(correctAmountTransaction === undefined)
            report.wrongAmountMembers.push(new MatchedRecord(member, nameMatchedTransactions));
        else
            report.paidMembers.push(new MatchedRecord(member, [correctAmountTransaction]))
    });


    renderDataProperties(memberManager.members.length, transactionManager.transactions.length,
        transactionManager.getOldestTransaction(), transactionManager.getNewestTransaction())
    renderResult(report);
};

window.onload = ()=> {
    const memberListInput = document.getElementById("member_list_input");
    const bankTransactionsInput = document.getElementById("bank_transactions_input");
    memberListInput.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) { return; }
        const reader = new FileReader();
        reader.onload = (event) => {
            memberManager = new MemberManager(event.target.result);

            if(memberManager !== null && transactionManager !== null)
                executeOperation();
        };
        reader.readAsText(file);
    };

    bankTransactionsInput.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) { return; }
        const reader = new FileReader();
        reader.onload = (event) => {
            transactionManager = new TransactionManager(event.target.result);

            if(memberManager !== null && transactionManager !== null)
                executeOperation();
        };
        reader.readAsText(file);
    };

}


