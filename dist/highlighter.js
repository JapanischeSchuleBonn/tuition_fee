export class Highlighter {
    constructor(keyword) {
        this.keyword = keyword;
    }
    addHighlight(input) {
        const RegularExp = new RegExp('(' + this.keyword + ')', "i");
        const ReplaceString = '<span class="highlight">$1</span>';
        return input.replace(RegularExp, ReplaceString);
    }
}
//# sourceMappingURL=highlighter.js.map