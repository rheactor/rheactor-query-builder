import { joinOperations, operation } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import type { Expression } from "@/types/Expression";
import type { Identifier } from "@/types/Identifier";

import { Builder } from "@/Builder";

export class BuilderInsert extends Builder {
  public constructor(table: Identifier, columns: Identifier[]) {
    super();

    this.internalTable(table);
    this.internalColumn(...columns);
  }

  public values(...values: Expression[]) {
    this.valuesOperations.push(values.map((value) => operation(value)));

    return this;
  }

  public override getOperations() {
    const operations: Operation[] = ["INSERT INTO "];

    if (this.tablesOperations.length > 0) {
      operations.push(
        ...joinOperations(this.tablesOperations, ", ", false),
        " ",
        ...joinOperations(this.columnsOperations, ", ", true),
        " ",
      );

      if (this.valuesOperations.length > 0) {
        operations.push("VALUES ");

        operations.push(
          ...joinOperations(
            this.valuesOperations.flatMap((values) => [
              joinOperations(values, ", ", true),
            ]),
            ", ",
            false,
          ),
        );
      }
    }

    this.generateWhereOperation(operations);
    this.generateLimitOperation(operations);
    this.generateOffsetOperation(operations);

    return operations;
  }
}
