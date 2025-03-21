import type { Operation } from "./types/Operation.js";
import { Builder } from "./Builder";
import type { Expression } from "./types/Expression";
export declare class BuilderCase extends Builder {
    private readonly expression?;
    private readonly whens;
    private expressionElse?;
    constructor(expression?: Expression | undefined);
    when(expression: Expression, then: Expression): this;
    else(expression: Expression): this;
    getOperations(): Operation[];
}
