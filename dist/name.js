export class Name {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    isFullNameKnown() {
        return this.firstName !== "" && this.lastName !== "";
    }
    isOnlyLastNameKnown() {
        return this.firstName === "" && this.lastName !== "";
    }
}
//# sourceMappingURL=name.js.map