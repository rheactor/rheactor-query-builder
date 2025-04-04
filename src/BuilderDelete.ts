import { joinOperations } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import type { Identifier } from "@/types/Identifier";

import { Builder } from "@/Builder";

export class BuilderDelete extends Builder {
  public constructor(table: Identifier) {
    super();

    this.internalTable(table);
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
    const operations: Operation[] = ["DELETE FROM "];

    operations.push(...joinOperations(this.tablesOperations, ", ", false), " ");

    this.generateWhereOperation(operations);
    this.generateLimitOperation(operations);
    this.generateOffsetOperation(operations);

    return operations;
  }
}
