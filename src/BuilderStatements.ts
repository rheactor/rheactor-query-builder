import type { Expression } from "@/types/Expression.js";
import type { Operation } from "@/types/Operation.js";

class BuilderStatements {
  public columns: Operation[][] = [];

  public tables: Operation[][] = [];

  public sets: Operation[][] = [];

  public wheres: Expression[] = [];

  public values: Operation[][][] = [];

  public limit?: Expression;

  public offset?: Expression;
}

export { BuilderStatements };
