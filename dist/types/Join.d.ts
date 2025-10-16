import type { Expression } from "./Expression";
import type { Identifier } from "./Identifier";
export type JoinType = "INNER";
export interface JoinClause {
    type: JoinType;
    table: Identifier;
    alias: Identifier;
    conditions: Expression[];
}
