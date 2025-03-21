import type { Operation } from "./types/Operation.js";
import { Builder } from "./Builder";
export declare class BuilderSelect extends Builder {
    select(...args: Parameters<Builder["internalColumn"]>): this;
    selectAliased(...args: Parameters<Builder["internalColumnAliased"]>): this;
    from(...args: Parameters<Builder["internalTable"]>): this;
    fromAliased(...args: Parameters<Builder["internalTableAliased"]>): this;
    where(...args: Parameters<Builder["internalWhere"]>): this;
    limit(...args: Parameters<Builder["internalLimit"]>): this;
    offset(...args: Parameters<Builder["internalOffset"]>): this;
    getOperations(): Operation[];
}
