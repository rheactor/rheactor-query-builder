import { BuilderStatements } from "@/BuilderStatements.js";
import { joinOperations, operation } from "@/services/OperationService.js";
import type { BuilderType } from "@/types/BuilderType.js";
import type { Expression } from "@/types/Expression.js";
import type { Falseable } from "@/types/Falseable.js";
import { isFalseable } from "@/types/Falseable.js";
import type { Identifier } from "@/types/Identifier.js";
import type { Operation } from "@/types/Operation.js";
import type { Value } from "@/types/Value.js";

export class Builder {
  private readonly statements;

  public constructor(private readonly type: BuilderType) {
    this.statements = new BuilderStatements(type);
  }

  public when(condition: boolean, then: (builder: Builder) => void) {
    if (condition) {
      then(this);
    }

    return this;
  }

  public select(...columns: Array<Falseable<Expression>>) {
    for (const column of columns) {
      this.selectAliased(column);
    }

    return this;
  }

  public selectAliased(identifier: Falseable<Expression>, alias?: Identifier) {
    if (!isFalseable(identifier)) {
      this.statements.select.push(
        operation({ type: "IDENTIFIER", identifier, alias }),
      );
    }

    return this;
  }

  public from(...tables: Array<Falseable<Identifier>>) {
    for (const table of tables) {
      this.fromAliased(table);
    }

    return this;
  }

  public fromAliased(table: Falseable<Expression>, alias?: Identifier) {
    if (!isFalseable(table)) {
      this.statements.reference.push(
        operation({ type: "IDENTIFIER", identifier: table, alias }),
      );
    }

    return this;
  }

  public into(table: Identifier) {
    this.statements.reference.push(
      operation({ type: "IDENTIFIER", identifier: table }),
    );

    return this;
  }

  public set(identifier: Identifier, expression: Expression) {
    this.statements.set.push(
      operation({ type: "SET", identifier, expression }),
    );

    return this;
  }

  public values(...values: Expression[]) {
    this.statements.values.push(values.map((value) => operation(value)));

    return this;
  }

  public where(...expressions: Array<Falseable<Expression>>) {
    for (const expression of expressions) {
      if (!isFalseable(expression)) {
        this.statements.where.push(expression);
      }
    }

    return this;
  }

  public limit(
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
      this.offset(offset);
    }

    return this;
  }

  public offset(offset: Falseable<Expression> | number) {
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

  public getOperations() {
    const operations: Operation[] = [];

    switch (this.statements.type) {
      case "select":
        operations.push("SELECT ");

        if (this.statements.select.length === 0) {
          operations.push("TRUE ");
        } else {
          operations.push(
            ...joinOperations(this.statements.select, ", ", false),
            " ",
          );
        }

        break;

      case "update":
        operations.push("UPDATE ");
        break;

      case "insert":
        operations.push("INSERT INTO ");
        break;

      case "delete":
        operations.push("DELETE FROM ");
        break;

      default:
    }

    if (this.type === "select") {
      if (this.statements.reference.length > 0) {
        operations.push(
          "FROM ",
          ...joinOperations(this.statements.reference, ", ", false),
          " ",
        );
      }
    } else if (this.type === "update" || this.type === "delete") {
      operations.push(
        ...joinOperations(this.statements.reference, ", ", false),
        " ",
      );
    } else if (this.statements.reference.length > 0) {
      operations.push(
        ...joinOperations(this.statements.reference, ", ", false),
        " ",
        ...joinOperations(this.statements.select, ", ", true),
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

    if (this.statements.set.length > 0) {
      operations.push("SET ");
      operations.push(...joinOperations(this.statements.set, ", ", false), " ");
    }

    if (this.statements.where.length > 0) {
      const whereOperations = operation({
        type: "AND",
        expressions: this.statements.where,
        includeParens: false,
      });

      if (whereOperations.length > 0) {
        operations.push("WHERE ", ...whereOperations);
      }
    }

    if (this.statements.limit !== undefined) {
      operations.push("LIMIT ", ...operation(this.statements.limit), " ");
    }

    if (this.statements.offset !== undefined) {
      operations.push("OFFSET ", ...operation(this.statements.offset), " ");
    }

    return operations;
  }

  public build() {
    const statements: string[] = [];
    const parameters: Value[] = [];

    for (const buildOperation of this.getOperations()) {
      if (typeof buildOperation === "string") {
        statements.push(buildOperation);
      } else {
        parameters.push(buildOperation.value);
        statements.push(`?${parameters.length}`);
      }
    }

    return {
      query: statements.join("").trimEnd(),
      parameters,
    };
  }
}
