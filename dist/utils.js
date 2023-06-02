export function createElement(tag, content) {
    let element = document.createElement(tag);
    element.innerHTML = content;
    return element;
}
export function createTableData(contents) {
    let elements = Array();
    contents.forEach(content => {
        elements.push(createElement("td", content));
    });
    return elements;
}
export function createSimpleDateString(date) {
    return date.toISOString().split('T')[0];
}
//# sourceMappingURL=utils.js.map