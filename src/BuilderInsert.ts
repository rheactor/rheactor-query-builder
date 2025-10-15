import { joinOperations, operation } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import type { Expression } from "@/types/Expression";
import type { Falseable } from "@/types/Falseable";
import type { Identifier } from "@/types/Identifier";

import { Builder } from "@/Builder";
import { BuilderConflict } from "@/BuilderConflict";

export class BuilderInsert extends Builder {
  private readonly onConflictBuilders: BuilderConflict[] = [];

  public constructor(table: Identifier, columns: Identifier[]) {
    super();

    this.internalTable(table);
    this.internalColumn(...columns);
  }

  public values(...values: Expression[]) {
    this.valuesOperations.push(values.map((value) => operation(value)));

    return this;
  }

  public onConflict(conflict: Falseable<BuilderConflict>) {
    if (conflict instanceof BuilderConflict) {
      this.onConflictBuilders.push(conflict);
    }

    return this;
  }

  public onConflictIgnore(columns?: Identifier[], where?: Expression) {
    this.onConflictBuilders.push(
      new BuilderConflict(columns, where).doNothing(),
    );

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
        operations.push(
          "VALUES ",
          ...joinOperations(
            this.valuesOperations.flatMap((values) => [
              joinOperations(values, ", ", true),
            ]),
            ", ",
            false,
          ),
        );
      }

      if (this.onConflictBuilders.length) {
        operations.push(" ");

        for (const onConflictBuilder of this.onConflictBuilders) {
          operations.push(...onConflictBuilder.getOperations());
        }
      }
    }

    this.generateWhereOperation(operations);
    this.generateLimitOperation(operations);
    this.generateOffsetOperation(operations);

    return operations;
  }
}
