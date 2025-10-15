import { joinOperations, operation } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import type { Expression } from "@/types/Expression";
import type { Falseable } from "@/types/Falseable";
import type { Identifier } from "@/types/Identifier";

import { Builder } from "@/Builder";

export class BuilderConflict extends Builder {
  private readonly conflictWheresExpressions: Falseable<Expression> | undefined;

  private conflictDoNothing = false;

  public constructor(columns: Identifier[] = [], where?: Expression) {
    super();

    this.internalColumn(...columns);
    this.conflictWheresExpressions = where;
  }

  public doNothing() {
    this.conflictDoNothing = true;

    return this;
  }

  public set(identifier: Identifier, expression: Expression) {
    this.setsOperations.push(
      operation({ type: "SET", identifier, expression }),
    );

    return this;
  }

  public where(...args: Parameters<Builder["internalWhere"]>) {
    return this.internalWhere(...args);
  }

  public override getOperations() {
    const operations: Operation[] = ["ON CONFLICT "];

    if (this.columnsOperations.length > 0) {
      operations.push(
        ...joinOperations(this.columnsOperations, ", ", true),
        " ",
      );
    }

    if (this.conflictWheresExpressions !== undefined) {
      const whereOperations = operation({
        type: "AND",
        expressions: [this.conflictWheresExpressions],
        includeParens: false,
      });

      if (whereOperations.length > 0) {
        operations.push("WHERE ", ...whereOperations, " ");
      }
    }

    operations.push(this.conflictDoNothing ? "DO NOTHING" : "DO UPDATE ");

    this.generateSetOperation(operations);
    this.generateWhereOperation(operations);

    return operations;
  }
}
