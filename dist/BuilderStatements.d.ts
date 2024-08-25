import type { BuilderType } from "./types/BuilderType.js";
import type { Expression } from "./types/Expression.js";
import type { Operation } from "./types/Operation.js";
declare class BuilderStatements {
    readonly type: BuilderType;
    select: Operation[][];
    reference: Operation[][];
    set: Operation[][];
    where: Expression[];
    values: Operation[][][];
    limit?: Expression;
    offset?: Expression;
    constructor(type: BuilderType);
}
export { BuilderStatements };
