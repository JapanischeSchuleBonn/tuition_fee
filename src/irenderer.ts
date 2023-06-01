import {Report} from "./report.js";

export interface IRenderer {
    render(report: Report) : void;
}

