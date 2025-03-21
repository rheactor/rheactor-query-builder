import { joinOperations, operation } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import { Builder } from "@/Builder";

import type { Expression } from "@/types/Expression";
import type { Identifier } from "@/types/Identifier";

export class BuilderInsert extends Builder {
  public constructor(table: Identifier, columns: Identifier[]) {
    super();

    this.internalTable(table);
    this.internalColumn(...columns);
  }

  public values(...values: Expression[]) {
    this.statements.values.push(values.map((value) => operation(value)));

    return this;
  }

  public override getOperations() {
    const operations: Operation[] = ["INSERT INTO "];

    if (this.statements.tables.length > 0) {
      operations.push(
        ...joinOperations(this.statements.tables, ", ", false),
        " ",
        ...joinOperations(this.statements.columns, ", ", true),
        " ",
      );

      if (this.statements.values.length > 0) {
        operations.push("VALUES ");

        operations.push(
          ...joinOperations(
            this.statements.values.flatMap((values) => [
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
