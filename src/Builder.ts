import { BuilderStatements } from "@/BuilderStatements.js";
import type { Operation } from "@/types/Operation.js";
import type { Value } from "@/types/Value.js";

import { isFalseable } from "@/services/FalseableService";
import { joinOperations, operation } from "@/services/OperationService";

import type { Expression } from "@/types/Expression";
import type { Falseable } from "@/types/Falseable";
import type { Identifier } from "@/types/Identifier";

export abstract class Builder {
  protected readonly statements = new BuilderStatements();

  public conditional(condition: boolean, then: (builder: this) => void) {
    if (condition) {
      then(this);
    }

    return this;
  }

  public build() {
    const query: string[] = [];
    const parameters: Value[] = [];

    for (const buildOperation of this.getOperations()) {
      if (typeof buildOperation === "string") {
        query.push(buildOperation);
      } else {
        parameters.push(buildOperation.value);
        query.push(`?${parameters.length}`);
      }
    }

    return {
      query: query.join("").trimEnd(),
      parameters,
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
      this.statements.columns.push(
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
      this.statements.tables.push(
        operation({ type: "IDENTIFIER", identifier: table, alias }),
      );
    }

    return this;
  }

  protected internalWhere(...expressions: Array<Falseable<Expression>>) {
    for (const expression of expressions) {
      if (!isFalseable(expression)) {
        this.statements.wheres.push(expression);
      }
    }

    return this;
  }

  protected internalLimit(
    limit: Falseable<Expression> | number,
    offset?: Falseable<Expression> | number,
  ) {
    this.statements.limit =
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
    this.statements.offset =
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
    if (this.statements.tables.length > 0) {
      operations.push(
        "FROM ",
        ...joinOperations(this.statements.tables, ", ", false),
        " ",
      );
    }
  }

  protected generateSetOperation(operations: Operation[]) {
    if (this.statements.sets.length > 0) {
      operations.push("SET ");
      operations.push(
        ...joinOperations(this.statements.sets, ", ", false),
        " ",
      );
    }
  }

  protected generateWhereOperation(operations: Operation[]) {
    if (this.statements.wheres.length > 0) {
      const whereOperations = operation({
        type: "AND",
        expressions: this.statements.wheres,
        includeParens: false,
      });

      if (whereOperations.length > 0) {
        operations.push("WHERE ", ...whereOperations, " ");
      }
    }
  }

  protected generateLimitOperation(operations: Operation[]) {
    if (this.statements.limit !== undefined) {
      operations.push("LIMIT ", ...operation(this.statements.limit), " ");
    }
  }

  protected generateOffsetOperation(operations: Operation[]) {
    if (this.statements.offset !== undefined) {
      operations.push("OFFSET ", ...operation(this.statements.offset), " ");
    }
  }

  public abstract getOperations(): Operation[];
}
