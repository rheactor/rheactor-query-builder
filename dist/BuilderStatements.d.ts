import type { Expression } from "./types/Expression.js";
import type { Operation } from "./types/Operation.js";
declare class BuilderStatements {
    columns: Operation[][];
    tables: Operation[][];
    sets: Operation[][];
    wheres: Expression[];
    values: Operation[][][];
    limit?: Expression;
    offset?: Expression;
}
export { BuilderStatements };
