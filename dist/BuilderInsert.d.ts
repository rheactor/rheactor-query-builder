import type { Operation } from "./types/Operation.js";
import type { Expression } from "./types/Expression";
import type { Falseable } from "./types/Falseable";
import type { Identifier } from "./types/Identifier";
import { Builder } from "./Builder";
import { BuilderConflict } from "./BuilderConflict";
type OrClause = "ABORT" | "FAIL" | "IGNORE" | "REPLACE" | "ROLLBACK";
export declare class BuilderInsert extends Builder {
    private readonly onConflictBuilders;
    private orClauseValue?;
    constructor(table: Identifier, columns: Identifier[]);
    values(...values: Expression[]): this;
    onConflict(conflict: Falseable<BuilderConflict>): this;
    onConflictIgnore(columns?: Identifier[], where?: Expression): this;
    orClause(clause: OrClause): this;
    getOperations(): Operation[];
}
export {};
