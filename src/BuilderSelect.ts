import { joinOperations, operation } from "@/services/OperationService.js";
import type { Operation } from "@/types/Operation.js";

import type { Expression } from "@/types/Expression";

import { Builder } from "@/Builder";

type OrderDirection = "ASC" | "DESC";
type OrderNulls = "NULLS FIRST" | "NULLS LAST";

interface Order {
  expression: Expression;
  direction?: OrderDirection;
  nulls?: OrderNulls;
}

export class BuilderSelect extends Builder {
  private selectDistinct = false;

  private readonly orders: Order[] = [];

  public select(...args: Parameters<Builder["internalColumn"]>) {
    return this.internalColumn(...args);
  }

  public selectAliased(...args: Parameters<Builder["internalColumnAliased"]>) {
    return this.internalColumnAliased(...args);
  }

  public distinct(mode = true) {
    this.selectDistinct = mode;

    return this;
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

  public orderBy(
    expression: Expression,
    direction?: OrderDirection,
    nulls?: OrderNulls,
  ) {
    this.orders.push({ expression, direction, nulls });

    return this;
  }

  public override getOperations() {
    const operations: Operation[] = ["SELECT "];

    if (this.selectDistinct) {
      operations.push("DISTINCT ");
    }

    if (this.columnsOperations.length === 0) {
      operations.push("TRUE ");
    } else {
      operations.push(
        ...joinOperations(this.columnsOperations, ", ", false),
        " ",
      );
    }

    this.generateFromOperation(operations);
    this.generateWhereOperation(operations);
    this.generateOrderByOperation(operations);
    this.generateLimitOperation(operations);
    this.generateOffsetOperation(operations);

    return operations;
  }

  private generateOrderByOperation(operations: Operation[]) {
    if (this.orders.length > 0) {
      operations.push("ORDER BY ");

      operations.push(
        ...joinOperations(
          this.orders.map((order) => [
            ...operation(order.expression),
            ...(order.direction ? [` ${order.direction}`] : []),
            ...(order.nulls ? [` ${order.nulls}`] : []),
          ]),
          ", ",
          false,
        ),
      );

      operations.push(" ");
    }
  }
}
