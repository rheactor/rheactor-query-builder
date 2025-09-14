import type { Operation } from "./types/Operation.js";
import type { Expression } from "./types/Expression";
import type { Identifier } from "./types/Identifier";
import { Builder } from "./Builder";
export declare class BuilderConflict extends Builder {
    private readonly conflictWheresExpressions;
    private conflictDoNothing;
    constructor(columns?: Identifier[], where?: Expression);
    doNothing(): this;
    set(identifier: Identifier, expression: Expression): this;
    where(...args: Parameters<Builder["internalWhere"]>): this;
    getOperations(): Operation[];
}
