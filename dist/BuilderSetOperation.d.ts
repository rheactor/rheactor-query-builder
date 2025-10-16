import { Builder } from "./Builder.js";
import type { Expression } from "./types/Expression.js";
import type { Operation } from "./types/Operation.js";
export declare class BuilderSetOperation extends Builder {
    private readonly queries;
    private readonly setOperation;
    constructor(queries: Expression[], setOperation?: "EXCEPT" | "INTERSECT" | "UNION ALL" | "UNION");
    getOperations(): Operation[];
}
