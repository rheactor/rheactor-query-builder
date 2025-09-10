import type { Builder } from "@/Builder.js";
import type { Cast } from "@/types/Cast.js";
import type { Collate } from "@/types/Collate.js";
import type { Expression, MathOperator } from "@/types/Expression.js";
import type { Falseable } from "@/types/Falseable.js";
import type { Identifier } from "@/types/Identifier.js";
import type { JsonValue } from "@/types/JsonValue.js";
import type { Value } from "@/types/Value.js";
import type { ValueExtended } from "@/types/ValueExtended.js";

import { BuilderCase } from "@/BuilderCase";
import { BuilderDelete } from "@/BuilderDelete";
import { BuilderInsert } from "@/BuilderInsert";
import { BuilderSelect } from "@/BuilderSelect";
import { BuilderUpdate } from "@/BuilderUpdate";
import { call, customCall } from "@/supports/SqliteFunctions";

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

  call,

  case(expression?: Expression) {
    return new BuilderCase(expression);
  },

  cast(expression: Expression, castType: Cast): Expression {
    return { type: "CAST", expression, cast: castType };
  },

  collate(expression: Expression, collateType: Collate = "BINARY"): Expression {
    return { type: "COLLATE", expression, collate: collateType };
  },

  customCall,

  delete(table: Identifier) {
    return new BuilderDelete(table);
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

  insert(table: Identifier, columns: Identifier[]) {
    return new BuilderInsert(table, columns);
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
    return new BuilderSelect().select(...columns);
  },

  staticValue(argument: ValueExtended): Expression {
    return { type: "STATIC", argument };
  },

  update(table: Identifier) {
    return new BuilderUpdate(table);
  },

  value(argument: Value): Expression {
    return { type: "VALUE", argument };
  },

  op(
    operator: MathOperator,
    expressionA: Expression,
    expressionB: Expression,
  ): Expression {
    return {
      type: "OPERATOR",
      operator,
      expressionA,
      expressionB,
    };
  },
};

export default functions;
