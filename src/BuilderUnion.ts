import { Builder } from "@/Builder.js";
import { operation } from "@/services/OperationService.js";
import type { Expression } from "@/types/Expression.js";
import type { Operation } from "@/types/Operation.js";

export class BuilderUnion extends Builder {
  public constructor(private readonly queries: Expression[]) {
    super();
  }

  public getOperations(): Operation[] {
    const operations: Operation[] = [];

    for (const query of this.queries) {
      if (operations.length > 0) {
        operations.push("UNION ");
      }

      if (query instanceof BuilderUnion) {
        operations.push("( ", ...operation(query), ")");
      } else {
        operations.push(...operation(query));
      }
    }

    return operations;
  }
}
