import { joinOperations } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import { Builder } from "@/Builder";

export class BuilderSelect extends Builder {
  public select(...args: Parameters<Builder["internalColumn"]>) {
    return this.internalColumn(...args);
  }

  public selectAliased(...args: Parameters<Builder["internalColumnAliased"]>) {
    return this.internalColumnAliased(...args);
  }

  public from(...args: Parameters<Builder["internalTable"]>) {
    return this.internalTable(...args);
  }

  public fromAliased(...args: Parameters<Builder["internalTableAliased"]>) {
    return this.internalTableAliased(...args);
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
    const operations: Operation[] = ["SELECT "];

    if (this.statements.columns.length === 0) {
      operations.push("TRUE ");
    } else {
      operations.push(
        ...joinOperations(this.statements.columns, ", ", false),
        " ",
      );
    }

    this.generateFromOperation(operations);
    this.generateWhereOperation(operations);
    this.generateLimitOperation(operations);
    this.generateOffsetOperation(operations);

    return operations;
  }
}
