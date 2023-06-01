export class Name{
    public readonly firstName: string;
    public readonly lastName: string;

    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public isFullNameKnown(): boolean{
        return this.firstName !== "" && this.lastName !== "";
    }

    public isOnlyLastNameKnown(): boolean{
        return this.firstName === "" && this.lastName !== "";
    }
}
