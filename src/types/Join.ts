import type { Expression } from "@/types/Expression";
import type { Identifier } from "@/types/Identifier";

export type JoinType = "INNER";

export interface JoinClause {
  type: JoinType;
  table: Identifier;
  alias: Identifier;
  conditions: Expression[];
}
