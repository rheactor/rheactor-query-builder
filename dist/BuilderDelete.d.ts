import type { Operation } from "./types/Operation.js";
import type { Identifier } from "./types/Identifier";
import { Builder } from "./Builder";
export declare class BuilderDelete extends Builder {
    constructor(table: Identifier);
    where(...args: Parameters<Builder["internalWhere"]>): this;
    limit(...args: Parameters<Builder["internalLimit"]>): this;
    offset(...args: Parameters<Builder["internalOffset"]>): this;
    getOperations(): Operation[];
}
