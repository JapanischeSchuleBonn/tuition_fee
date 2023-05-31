import { Name } from "./name.js";

export class Person{
    constructor(name:Name, nameInJapanese:Name) {
        this.name = name;
        this.nameInJapanese = nameInJapanese;
    }

    public readonly name;
    public readonly nameInJapanese;
}
