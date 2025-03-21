import type { Operation } from "./types/Operation.js";
import { Builder } from "./Builder";
import type { Expression } from "./types/Expression";
import type { Identifier } from "./types/Identifier";
export declare class BuilderInsert extends Builder {
    constructor(table: Identifier, columns: Identifier[]);
    values(...values: Expression[]): this;
    getOperations(): Operation[];
}
