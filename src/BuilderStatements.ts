import type { BuilderType } from "@/types/BuilderType.js";
import type { Expression } from "@/types/Expression.js";
import type { Operation } from "@/types/Operation.js";

class BuilderStatements {
  public select: Operation[][] = [];

  public reference: Operation[][] = [];

  public set: Operation[][] = [];

  public where: Expression[] = [];

  public values: Operation[][][] = [];

  public limit?: Expression;

  public offset?: Expression;

  public constructor(public readonly type: BuilderType) {}
}

export { BuilderStatements };
