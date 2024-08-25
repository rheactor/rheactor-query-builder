import type { Expression } from "../types/Expression.js";
import type { Operation } from "../types/Operation.js";
export declare function joinOperations(operations: Operation[][], joiner: string, includeParens: boolean): Operation[];
export declare function operation(expression: Expression): Operation[];
