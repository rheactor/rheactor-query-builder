import type { Builder } from "../Builder.js";
import type { Cast } from "./Cast.js";
import type { Collate } from "./Collate.js";
import type { Falseable } from "./Falseable.js";
import type { Identifier } from "./Identifier.js";
import type { JsonValue } from "./JsonValue.js";
import type { Value } from "./Value.js";
import type { ValueExtended } from "./ValueExtended.js";
export type MathOperator = "-" | "*" | "**" | "/" | "%" | "+";
type ComparisonOperator = "!=" | "<" | "<=" | "=" | ">" | ">=";
type LogicalOperator = "AND" | "OR";
export type Expression = Builder | Identifier | {
    type: "BETWEEN";
    identifier: Identifier;
    from: Expression;
    to: Expression;
} | {
    type: "OPERATOR";
    operator: MathOperator;
    expressionA: Expression;
    expressionB: Expression;
} | {
    type: LogicalOperator;
    expressions: Array<Falseable<Expression>>;
    includeParens?: boolean;
} | {
    type: "CALL";
    identifier: Identifier;
    functionArguments: Expression[];
} | {
    type: "CAST";
    expression: Expression;
    cast: Cast;
} | {
    type: "COLLATE";
    expression: Expression;
    collate: Collate;
} | {
    type: "EXCLUDED";
    identifier: Identifier;
} | {
    type: "EXISTS";
    builder: Builder;
} | {
    type: "IDENTIFIER";
    identifier: Expression;
    alias?: Identifier;
} | {
    type: "IS NULL";
    identifier: Identifier;
} | {
    type: "JSON";
    argument: JsonValue;
} | {
    type: "MATCH" | "SET";
    identifier: Identifier;
    expression: Expression;
} | {
    type: "NOT";
    expression: Expression;
} | {
    type: "RAW";
    expression: string;
} | {
    type: "STATIC";
    argument: ValueExtended;
} | {
    type: "VALUE";
    argument: Value;
} | {
    type: ComparisonOperator;
    sideA: Expression;
    sideB: Expression;
};
export {};
