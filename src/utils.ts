

export function createElement(tag:string, content:string){
    let element = document.createElement(tag);
    element.innerHTML = content;
    return element;
}

export function createTableData(contents: Array<string>){
    let elements = Array<Element>();
    contents.forEach(content => {
       elements.push(createElement("td", content))
    });
    return elements;
}

export function createSimpleDateString(date: Date){
    return date.toISOString().split('T')[0];
}

