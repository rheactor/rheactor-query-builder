import type { Operation } from "./types/Operation.js";
import type { Expression } from "./types/Expression";
import type { Falseable } from "./types/Falseable";
import type { Identifier } from "./types/Identifier";
import { Builder } from "./Builder";
import { BuilderConflict } from "./BuilderConflict";
export declare class BuilderInsert extends Builder {
    private readonly onConflictBuilders;
    constructor(table: Identifier, columns: Identifier[]);
    values(...values: Expression[]): this;
    onConflict(conflict: Falseable<BuilderConflict>): this;
    onConflictIgnore(columns?: Identifier[], where?: Expression): this;
    getOperations(): Operation[];
}
