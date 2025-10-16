import { Builder } from "./Builder.js";
import type { Expression } from "./types/Expression.js";
import type { Operation } from "./types/Operation.js";
export declare class BuilderUnion extends Builder {
    private readonly queries;
    private readonly unionType;
    constructor(queries: Expression[], unionType?: "UNION ALL" | "UNION");
    getOperations(): Operation[];
}
