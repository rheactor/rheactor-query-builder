import { joinOperations, operation } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import type { Expression } from "@/types/Expression";
import type { Identifier } from "@/types/Identifier";

import { Builder } from "@/Builder";

export class BuilderUpdate extends Builder {
  public constructor(table: Identifier) {
    super();

    this.internalTable(table);
  }

  public set(identifier: Identifier, expression: Expression) {
    this.statements.sets.push(
      operation({ type: "SET", identifier, expression }),
    );

    return this;
  }

  public where(...args: Parameters<Builder["internalWhere"]>) {
    return this.internalWhere(...args);
  }

  public limit(...args: Parameters<Builder["internalLimit"]>) {
    return this.internalLimit(...args);
  }

  public offset(...args: Parameters<Builder["internalOffset"]>) {
    return this.internalOffset(...args);
  }

  public override getOperations() {
    const operations: Operation[] = ["UPDATE "];

    operations.push(
      ...joinOperations(this.statements.tables, ", ", false),
      " ",
    );

    this.generateSetOperation(operations);
    this.generateWhereOperation(operations);
    this.generateLimitOperation(operations);
    this.generateOffsetOperation(operations);

    return operations;
  }
}
