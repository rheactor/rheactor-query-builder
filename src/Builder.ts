import type { Operation } from "@/types/Operation.js";
import type { Value } from "@/types/Value.js";

import type { Expression } from "@/types/Expression";
import type { Falseable } from "@/types/Falseable";
import type { Identifier } from "@/types/Identifier";

import { isFalseable } from "@/services/FalseableService";
import { joinOperations, operation } from "@/services/OperationService";

export abstract class Builder {
  protected readonly columnsOperations: Operation[][] = [];

  protected readonly tablesOperations: Operation[][] = [];

  protected readonly setsOperations: Operation[][] = [];

  protected readonly valuesOperations: Operation[][][] = [];

  private readonly wheresExpressions: Expression[] = [];

  private limitExpression?: Expression;

  private offsetExpression?: Expression;

  public conditional(condition: boolean, then: (builder: this) => void) {
    if (condition) {
      then(this);
    }

    return this;
  }

  public build() {
    const query: string[] = [];
    const parameters = new Map<Value, number>();

    for (const buildOperation of this.getOperations()) {
      if (typeof buildOperation === "string") {
        query.push(buildOperation);
      } else {
        if (!parameters.has(buildOperation.value)) {
          parameters.set(buildOperation.value, parameters.size + 1);
        }

        query.push(`?${parameters.get(buildOperation.value)}`);
      }
    }

    return {
      query: query.join("").trimEnd(),
      parameters: [...parameters.keys()],
    };
  }

  protected internalColumn(...columns: Array<Falseable<Expression>>) {
    for (const column of columns) {
      this.internalColumnAliased(column);
    }

    return this;
  }

  protected internalColumnAliased(
    identifier: Falseable<Expression>,
    alias?: Identifier,
  ) {
    if (!isFalseable(identifier)) {
      this.columnsOperations.push(
        operation({ type: "IDENTIFIER", identifier, alias }),
      );
    }

    return this;
  }

  protected internalTable(...tables: Array<Falseable<Identifier>>) {
    for (const table of tables) {
      this.internalTableAliased(table);
    }

    return this;
  }

  protected internalTableAliased(
    table: Falseable<Expression>,
    alias?: Identifier,
  ) {
    if (!isFalseable(table)) {
      this.tablesOperations.push(
        operation({ type: "IDENTIFIER", identifier: table, alias }),
      );
    }

    return this;
  }

  protected internalWhere(...expressions: Array<Falseable<Expression>>) {
    for (const expression of expressions) {
      if (!isFalseable(expression)) {
        this.wheresExpressions.push(expression);
      }
    }

    return this;
  }

  protected internalLimit(
    limit: Falseable<Expression> | number,
    offset?: Falseable<Expression> | number,
  ) {
    this.limitExpression =
      typeof limit === "number"
        ? { type: "STATIC", argument: limit }
        : isFalseable(limit)
          ? undefined
          : limit;

    if (arguments.length >= 2) {
      this.internalOffset(offset);
    }

    return this;
  }

  protected internalOffset(offset: Falseable<Expression> | number) {
    this.offsetExpression =
      typeof offset === "number"
        ? offset === 0
          ? undefined
          : { type: "STATIC", argument: offset }
        : isFalseable(offset)
          ? undefined
          : offset;

    return this;
  }

  protected generateFromOperation(operations: Operation[]) {
    if (this.tablesOperations.length > 0) {
      operations.push(
        "FROM ",
        ...joinOperations(this.tablesOperations, ", ", false),
        " ",
      );
    }
  }

  protected generateSetOperation(operations: Operation[]) {
    if (this.setsOperations.length > 0) {
      operations.push(
        "SET ",
        ...joinOperations(this.setsOperations, ", ", false),
        " ",
      );
    }
  }

  protected generateWhereOperation(operations: Operation[]) {
    if (this.wheresExpressions.length > 0) {
      const whereOperations = operation({
        type: "AND",
        expressions: this.wheresExpressions,
        includeParens: false,
      });

      if (whereOperations.length > 0) {
        operations.push("WHERE ", ...whereOperations, " ");
      }
    }
  }

  protected generateLimitOperation(operations: Operation[]) {
    if (this.limitExpression !== undefined) {
      operations.push("LIMIT ", ...operation(this.limitExpression), " ");
    }
  }

  protected generateOffsetOperation(operations: Operation[]) {
    if (this.offsetExpression !== undefined) {
      operations.push("OFFSET ", ...operation(this.offsetExpression), " ");
    }
  }

  public abstract getOperations(): Operation[];
}
