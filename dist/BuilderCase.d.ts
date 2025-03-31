import type { Operation } from "./types/Operation.js";
import type { Expression } from "./types/Expression";
import { Builder } from "./Builder";
export declare class BuilderCase extends Builder {
    private readonly expression?;
    private readonly whens;
    private expressionElse?;
    constructor(expression?: Expression | undefined);
    when(expression: Expression, then: Expression): this;
    else(expression: Expression): this;
    getOperations(): Operation[];
}
