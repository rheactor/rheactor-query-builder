import { Builder } from "@/Builder.js";
import type { Cast } from "@/types/Cast.js";
import type { Collate } from "@/types/Collate.js";
import type { Expression } from "@/types/Expression.js";
import type { Falseable } from "@/types/Falseable.js";
import type { Identifier } from "@/types/Identifier.js";
import type { JsonValue } from "@/types/JsonValue.js";
import type { Value } from "@/types/Value.js";
import type { ValueExtended } from "@/types/ValueExtended.js";

const functions = {
  and(...expressions: Array<Falseable<Expression>>): Expression {
    return { type: "AND", expressions };
  },

  between(
    identifier: Identifier,
    from: Expression,
    to: Expression,
  ): Expression {
    return { type: "BETWEEN", identifier, from, to };
  },

  call(identifier: string, ...functionArguments: Expression[]): Expression {
    return { type: "CALL", identifier, functionArguments };
  },

  cast(expression: Expression, castType: Cast): Expression {
    return { type: "CAST", expression, cast: castType };
  },

  collate(expression: Expression, collateType: Collate = "BINARY"): Expression {
    return { type: "COLLATE", expression, collate: collateType };
  },

  delete(): Builder {
    return new Builder("delete");
  },

  eq(sideA: Expression, sideB: Expression): Expression {
    return { type: "=", sideA, sideB };
  },

  exists(builder: Builder): Expression {
    return { type: "EXISTS", builder };
  },

  gt(sideA: Expression, sideB: Expression): Expression {
    return { type: ">", sideA, sideB };
  },

  gte(sideA: Expression, sideB: Expression): Expression {
    return { type: ">=", sideA, sideB };
  },

  isNull(identifier: Identifier): Expression {
    return { type: "IS NULL", identifier };
  },

  insert(...columns: Identifier[]) {
    return new Builder("insert").select(...columns);
  },

  isNotNull(identifier: Identifier): Expression {
    return functions.not({ type: "IS NULL", identifier });
  },

  jsonValue(argument: JsonValue): Expression {
    return { type: "JSON", argument };
  },

  lt(sideA: Expression, sideB: Expression): Expression {
    return { type: "<", sideA, sideB };
  },

  lte(sideA: Expression, sideB: Expression): Expression {
    return { type: "<=", sideA, sideB };
  },

  neq(sideA: Expression, sideB: Expression): Expression {
    return { type: "!=", sideA, sideB };
  },

  not(expression: Expression): Expression {
    return { type: "NOT", expression };
  },

  notBetween(
    identifier: Identifier,
    from: Expression,
    to: Expression,
  ): Expression {
    return functions.not({ type: "BETWEEN", identifier, from, to });
  },

  or(...expressions: Array<Falseable<Expression>>): Expression {
    return { type: "OR", expressions };
  },

  raw(expression: string): Expression {
    return { type: "RAW", expression };
  },

  select(...columns: Array<Falseable<Expression>>) {
    return new Builder("select").select(...columns);
  },

  staticValue(argument: ValueExtended): Expression {
    return { type: "STATIC", argument };
  },

  update(table: Identifier) {
    return new Builder("update").from(table);
  },

  value(argument: Value): Expression {
    return { type: "VALUE", argument };
  },
};

export default functions;
