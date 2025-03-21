import type { Expression } from "../types/Expression";
import type { Identifier } from "../types/Identifier";
declare function customCall(identifier: string, ...functionArguments: Expression[]): {
    readonly type: "CALL";
    readonly identifier: string;
    readonly functionArguments: Expression[];
};
declare function call(identifier: "ABS", value: Expression): Expression;
declare function call(identifier: "CHANGES"): Expression;
declare function call(identifier: "CHAR", ...characters: Expression[]): Expression;
declare function call(identifier: "COALESCE", ...expressions: Expression[]): Expression;
declare function call(identifier: "CONCAT", ...expressions: Expression[]): Expression;
declare function call(identifier: "CONCAT_WS", separator: Expression, ...expressions: Expression[]): Expression;
declare function call(identifier: "FORMAT", format: Expression, ...expressions: Expression[]): Expression;
declare function call(identifier: "GLOB", pattern: Expression, value: Expression): Expression;
declare function call(identifier: "HEX", value: Expression): Expression;
declare function call(identifier: "IFNULL", valueA: Expression, valueB: Expression): Expression;
declare function call(identifier: "IF" | "IIF", ...expressions: Expression[]): Expression;
declare function call(identifier: "INSTR", valueA: Expression, valueB: Expression): Expression;
declare function call(identifier: "LAST_INSERT_ROWID"): Expression;
declare function call(identifier: "LENGTH", value: Expression): Expression;
declare function call(identifier: "LIKE", pattern: Expression, value: Expression): Expression;
declare function call(identifier: "LIKE", pattern: Expression, value: Expression, escape: Expression): Expression;
declare function call(identifier: "LIKELIHOOD", valueA: Expression, valueB: Expression): Expression;
declare function call(identifier: "LIKELY", value: Expression): Expression;
declare function call(identifier: "LOAD_EXTENSION", name: Expression): Expression;
declare function call(identifier: "LOAD_EXTENSION", name: Expression, entryPoint: Expression): Expression;
declare function call(identifier: "LOWER", value: Expression): Expression;
declare function call(identifier: "LTRIM", value: Expression): Expression;
declare function call(identifier: "LTRIM", value: Expression, character: Expression): Expression;
declare function call(identifier: "MAX", ...expressions: Expression[]): Expression;
declare function call(identifier: "MIN", ...expressions: Expression[]): Expression;
declare function call(identifier: "NULLIF", valueA: Expression, valueB: Expression): Expression;
declare function call(identifier: "OCTET_LENGTH", value: Expression): Expression;
declare function call(identifier: "PRINTF", ...expressions: Expression[]): Expression;
declare function call(identifier: "QUOTE", value: Expression): Expression;
declare function call(identifier: "RANDOM"): Expression;
declare function call(identifier: "RANDOMBLOB", size: Expression): Expression;
declare function call(identifier: "REPLACE", value: Expression, search: Expression, replaceBy: Expression): Expression;
declare function call(identifier: "ROUND", value: Expression): Expression;
declare function call(identifier: "ROUND", value: Expression, digits: Expression): Expression;
declare function call(identifier: "RTRIM", value: Expression): Expression;
declare function call(identifier: "RTRIM", value: Expression, character: Expression): Expression;
declare function call(identifier: "SIGN", value: Expression): Expression;
declare function call(identifier: "SOUNDEX", value: Expression): Expression;
declare function call(identifier: "SQLITE_COMPILEOPTION_GET", option: Expression): Expression;
declare function call(identifier: "SQLITE_COMPILEOPTION_USED", option: Expression): Expression;
declare function call(identifier: "SQLITE_OFFSET", column: Identifier): Expression;
declare function call(identifier: "SQLITE_SOURCE_ID"): Expression;
declare function call(identifier: "SQLITE_VERSION"): Expression;
declare function call(identifier: "SUBSTR" | "SUBSTRING", value: Expression, position: Expression): Expression;
declare function call(identifier: "SUBSTR" | "SUBSTRING", value: Expression, position: Expression, length: Expression): Expression;
declare function call(identifier: "TOTAL_CHANGES"): Expression;
declare function call(identifier: "TRIM", value: Expression): Expression;
declare function call(identifier: "TRIM", value: Expression, character: Expression): Expression;
declare function call(identifier: "TYPEOF", value: Expression): Expression;
declare function call(identifier: "UNHEX", value: Expression): Expression;
declare function call(identifier: "UNHEX", value: Expression, escapes: Expression): Expression;
declare function call(identifier: "UNICODE", value: Expression): Expression;
declare function call(identifier: "UNLIKELY", value: Expression): Expression;
declare function call(identifier: "UPPER", value: Expression): Expression;
declare function call(identifier: "ZEROBLOB", size: Expression): Expression;
declare function call(identifier: "ACOS" | "ACOSH" | "ASIN" | "ASINH" | "ATAN" | "ATANH" | "CEIL" | "CEILING" | "COS" | "COSH" | "DEGREES" | "EXP" | "FLOOR" | "LN" | "LOG" | "LOG2" | "LOG10" | "RADIANS" | "SIN" | "SINH" | "SQRT" | "TAN" | "TANH" | "TRUNC", X: Expression): Expression;
declare function call(identifier: "ATAN2", Y: Expression, X: Expression): Expression;
declare function call(identifier: "LOG", B: Expression, X: Expression): Expression;
declare function call(identifier: "MOD", X: Expression, Y: Expression): Expression;
declare function call(identifier: "POW", X: Expression, Y: Expression): Expression;
declare function call(identifier: "POWER", X: Expression, Y: Expression): Expression;
declare function call(identifier: "PI"): Expression;
declare function call(identifier: "DATE" | "DATETIME" | "JULIANDAY" | "TIME" | "UNIXEPOCH"): Expression;
declare function call(identifier: "DATE" | "DATETIME" | "JULIANDAY" | "TIME" | "UNIXEPOCH", timeValue: Expression, ...modifiers: Expression[]): Expression;
declare function call(identifier: "STRFTIME", format: Expression): Expression;
declare function call(identifier: "STRFTIME", format: Expression, timeValue: Expression, ...modifiers: Expression[]): Expression;
declare function call(identifier: "TIMEDIFF", timeA: Expression, timeB: Expression): Expression;
declare function call(identifier: "JSON" | "JSONB", json: Expression): Expression;
declare function call(identifier: "JSON_ARRAY" | "JSONB_ARRAY", ...values: Expression[]): Expression;
declare function call(identifier: "JSON_ARRAY_LENGTH", json: Expression): Expression;
declare function call(identifier: "JSON_ARRAY_LENGTH", json: Expression, path: Expression): Expression;
declare function call(identifier: "JSON_ERROR_POSITION", json: Expression): Expression;
declare function call(identifier: "JSON_EXTRACT" | "JSONB_EXTRACT", json: Expression): Expression;
declare function call(identifier: "JSON_EXTRACT" | "JSONB_EXTRACT", json: Expression, ...paths: Expression[]): Expression;
declare function call(identifier: "JSON_INSERT" | "JSONB_INSERT", json: Expression, path: Expression, ...values: Expression[]): Expression;
declare function call(identifier: "JSON_OBJECT" | "JSONB_OBJECT", ...values: Expression[]): Expression;
declare function call(identifier: "JSON_PATCH" | "JSONB_PATCH", json: Expression, patch: Expression): Expression;
declare function call(identifier: "JSON_PRETTY", json: Expression): Expression;
declare function call(identifier: "JSON_REMOVE" | "JSONB_REMOVE", json: Expression, ...paths: Expression[]): Expression;
declare function call(identifier: "JSON_REPLACE" | "JSONB_REPLACE", json: Expression, ...values: Expression[]): Expression;
declare function call(identifier: "JSON_SET" | "JSONB_SET", json: Expression, ...values: Expression[]): Expression;
declare function call(identifier: "JSON_TYPE", json: Expression): Expression;
declare function call(identifier: "JSON_TYPE", json: Expression, path: Expression): Expression;
declare function call(identifier: "JSON_VALID", json: Expression): Expression;
declare function call(identifier: "JSON_VALID", json: Expression, flags: Expression): Expression;
declare function call(identifier: "JSON_QUOTE", value: Expression): Expression;
declare function call(identifier: "JSON_GROUP_ARRAY" | "JSONB_GROUP_ARRAY", value: Expression): Expression;
declare function call(identifier: "JSON_GROUP_OBJECT" | "JSONB_GROUP_OBJECT", label: Expression, value: Expression): Expression;
declare function call(identifier: "JSON_EACH", json: Expression): Expression;
declare function call(identifier: "JSON_EACH", json: Expression, path: Expression): Expression;
declare function call(identifier: "JSON_TREE", json: Expression): Expression;
declare function call(identifier: "JSON_TREE", json: Expression, path: Expression): Expression;
export { call, customCall };
