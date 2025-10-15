import type { Operation } from "./types/Operation.js";
import type { Expression } from "./types/Expression";
import type { Falseable } from "./types/Falseable";
import { Builder } from "./Builder";
type OrderDirection = "ASC" | "DESC";
type OrderNulls = "NULLS FIRST" | "NULLS LAST";
export declare class BuilderSelect extends Builder {
    private selectDistinct;
    private readonly orders;
    private readonly groupByColumns;
    select(...args: Parameters<Builder["internalColumn"]>): this;
    selectAliased(...args: Parameters<Builder["internalColumnAliased"]>): this;
    distinct(mode?: boolean): this;
    from(...args: Parameters<Builder["internalTable"]>): this;
    fromAliased(...args: Parameters<Builder["internalTableAliased"]>): this;
    where(...args: Parameters<Builder["internalWhere"]>): this;
    limit(...args: Parameters<Builder["internalLimit"]>): this;
    offset(...args: Parameters<Builder["internalOffset"]>): this;
    groupBy(...expressions: Array<Falseable<Expression>>): this;
    orderBy(expression: Expression, direction?: OrderDirection, nulls?: OrderNulls): this;
    getOperations(): Operation[];
    private generateOrderByOperation;
}
export {};
