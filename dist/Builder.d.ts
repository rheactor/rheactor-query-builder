import { BuilderStatements } from "./BuilderStatements.js";
import type { Operation } from "./types/Operation.js";
import type { Value } from "./types/Value.js";
import type { Expression } from "./types/Expression";
import type { Falseable } from "./types/Falseable";
import type { Identifier } from "./types/Identifier";
export declare abstract class Builder {
    protected readonly statements: BuilderStatements;
    when(condition: boolean, then: (builder: this) => void): this;
    build(): {
        query: string;
        parameters: Value[];
    };
    protected internalColumn(...columns: Array<Falseable<Expression>>): this;
    protected internalColumnAliased(identifier: Falseable<Expression>, alias?: Identifier): this;
    protected internalTable(...tables: Array<Falseable<Identifier>>): this;
    protected internalTableAliased(table: Falseable<Expression>, alias?: Identifier): this;
    protected internalWhere(...expressions: Array<Falseable<Expression>>): this;
    protected internalLimit(limit: Falseable<Expression> | number, offset?: Falseable<Expression> | number): this;
    protected internalOffset(offset: Falseable<Expression> | number): this;
    protected generateFromOperation(operations: Operation[]): void;
    protected generateSetOperation(operations: Operation[]): void;
    protected generateWhereOperation(operations: Operation[]): void;
    protected generateLimitOperation(operations: Operation[]): void;
    protected generateOffsetOperation(operations: Operation[]): void;
    abstract getOperations(): Operation[];
}
