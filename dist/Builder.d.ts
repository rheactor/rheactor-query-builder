import type { BuilderType } from "./types/BuilderType.js";
import type { Expression } from "./types/Expression.js";
import type { Falseable } from "./types/Falseable.js";
import type { Identifier } from "./types/Identifier.js";
import type { Operation } from "./types/Operation.js";
import type { Value } from "./types/Value.js";
export declare class Builder {
    private readonly type;
    private readonly statements;
    constructor(type: BuilderType);
    when(condition: boolean, then: (builder: Builder) => void): this;
    select(...columns: Array<Falseable<Expression>>): this;
    selectAliased(identifier: Falseable<Expression>, alias?: Identifier): this;
    from(...tables: Array<Falseable<Identifier>>): this;
    fromAliased(table: Falseable<Expression>, alias?: Identifier): this;
    into(table: Identifier): this;
    set(identifier: Identifier, expression: Expression): this;
    values(...values: Expression[]): this;
    where(...expressions: Array<Falseable<Expression>>): this;
    limit(limit: Falseable<Expression> | number, offset?: Falseable<Expression> | number): this;
    offset(offset: Falseable<Expression> | number): this;
    getOperations(): Operation[];
    build(): {
        query: string;
        parameters: Value[];
    };
}
