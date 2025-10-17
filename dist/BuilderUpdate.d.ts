import type { Operation } from "./types/Operation.js";
import type { Expression } from "./types/Expression";
import type { Identifier } from "./types/Identifier";
import { Builder } from "./Builder";
export declare class BuilderUpdate extends Builder {
    constructor(table: Identifier);
    set(identifier: Identifier, expression: Expression): this;
    where(...args: Parameters<Builder["internalWhere"]>): this;
    limit(...args: Parameters<Builder["internalLimit"]>): this;
    offset(...args: Parameters<Builder["internalOffset"]>): this;
    returning(...expressions: Expression[]): this;
    getOperations(): Operation[];
}
