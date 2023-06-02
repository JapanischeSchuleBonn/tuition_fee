
export class Highlighter{
    keyword: string;

    constructor(keyword: string) {
        this.keyword = keyword;
    }

    addHighlight(input: string): string{
        const RegularExp = new RegExp( '(' + this.keyword + ')', "i" );
        const ReplaceString = '<span class="highlight">$1</span>';
        return input.replace( RegularExp , ReplaceString );
    }
}
