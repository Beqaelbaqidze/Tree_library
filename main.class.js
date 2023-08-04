

export class mainClass {
    htmlLITpl = (value) => `<li>${value}</li>`;
    htmlUlTpl = (li) => `<ul>${li}</ul>`;
    
    constructor() {

    }

    inject(selector, key, data) {
        let vHTML = '';
        for (const item of data) {
            vHTML += this.htmlLITpl(item[key]);
        }
        const assembledHTML = htmlUlTpl(vHTML);
        document.querySelector(selector).innerHTML = assembledHTML;
    }

}