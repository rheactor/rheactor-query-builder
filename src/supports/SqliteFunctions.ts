import type { Expression } from "@/types/Expression";
import type { Identifier } from "@/types/Identifier";

function customCall(identifier: string, ...functionArguments: Expression[]) {
  return { type: "CALL", identifier, functionArguments } as const;
}

// Built-In Scalar SQL Functions.
// @ref https://www.sqlite.org/lang_corefunc.html
function call(identifier: "ABS", value: Expression): Expression;
function call(identifier: "CHANGES"): Expression;
function call(identifier: "CHAR", ...characters: Expression[]): Expression;
function call(identifier: "COALESCE", ...expressions: Expression[]): Expression;
function call(identifier: "CONCAT", ...expressions: Expression[]): Expression;
function call(
  identifier: "CONCAT_WS",
  separator: Expression,
  ...expressions: Expression[]
): Expression;
function call(
  identifier: "FORMAT",
  format: Expression,
  ...expressions: Expression[]
): Expression;
function call(
  identifier: "GLOB",
  pattern: Expression,
  value: Expression,
): Expression;
function call(identifier: "HEX", value: Expression): Expression;
function call(
  identifier: "IFNULL",
  valueA: Expression,
  valueB: Expression,
): Expression;
function call(
  identifier: "IF" | "IIF",
  ...expressions: Expression[]
): Expression;
function call(
  identifier: "INSTR",
  valueA: Expression,
  valueB: Expression,
): Expression;
function call(identifier: "LAST_INSERT_ROWID"): Expression;
function call(identifier: "LENGTH", value: Expression): Expression;
function call(
  identifier: "LIKE",
  pattern: Expression,
  value: Expression,
): Expression;
function call(
  identifier: "LIKE",
  pattern: Expression,
  value: Expression,
  escape: Expression,
): Expression;
function call(
  identifier: "LIKELIHOOD",
  valueA: Expression,
  valueB: Expression,
): Expression;
function call(identifier: "LIKELY", value: Expression): Expression;
function call(identifier: "LOAD_EXTENSION", name: Expression): Expression;
function call(
  identifier: "LOAD_EXTENSION",
  name: Expression,
  entryPoint: Expression,
): Expression;
function call(identifier: "LOWER", value: Expression): Expression;
function call(identifier: "LTRIM", value: Expression): Expression;
function call(
  identifier: "LTRIM",
  value: Expression,
  character: Expression,
): Expression;
function call(identifier: "MAX", ...expressions: Expression[]): Expression;
function call(identifier: "MIN", ...expressions: Expression[]): Expression;
function call(
  identifier: "NULLIF",
  valueA: Expression,
  valueB: Expression,
): Expression;
function call(identifier: "OCTET_LENGTH", value: Expression): Expression;
function call(identifier: "PRINTF", ...expressions: Expression[]): Expression;
function call(identifier: "QUOTE", value: Expression): Expression;
function call(identifier: "RANDOM"): Expression;
function call(identifier: "RANDOMBLOB", size: Expression): Expression;
function call(
  identifier: "REPLACE",
  value: Expression,
  search: Expression,
  replaceBy: Expression,
): Expression;
function call(identifier: "ROUND", value: Expression): Expression;
function call(
  identifier: "ROUND",
  value: Expression,
  digits: Expression,
): Expression;
function call(identifier: "RTRIM", value: Expression): Expression;
function call(
  identifier: "RTRIM",
  value: Expression,
  character: Expression,
): Expression;
function call(identifier: "SIGN", value: Expression): Expression;
function call(identifier: "SOUNDEX", value: Expression): Expression;
function call(
  identifier: "SQLITE_COMPILEOPTION_GET",
  option: Expression,
): Expression;
function call(
  identifier: "SQLITE_COMPILEOPTION_USED",
  option: Expression,
): Expression;
function call(identifier: "SQLITE_OFFSET", column: Identifier): Expression;
function call(identifier: "SQLITE_SOURCE_ID"): Expression;
function call(identifier: "SQLITE_VERSION"): Expression;
function call(
  identifier: "SUBSTR" | "SUBSTRING",
  value: Expression,
  position: Expression,
): Expression;
function call(
  identifier: "SUBSTR" | "SUBSTRING",
  value: Expression,
  position: Expression,
  length: Expression,
): Expression;
function call(identifier: "TOTAL_CHANGES"): Expression;
function call(identifier: "TRIM", value: Expression): Expression;
function call(
  identifier: "TRIM",
  value: Expression,
  character: Expression,
): Expression;
function call(identifier: "TYPEOF", value: Expression): Expression;
function call(identifier: "UNHEX", value: Expression): Expression;
function call(
  identifier: "UNHEX",
  value: Expression,
  escapes: Expression,
): Expression;
function call(identifier: "UNICODE", value: Expression): Expression;
function call(identifier: "UNLIKELY", value: Expression): Expression;
function call(identifier: "UPPER", value: Expression): Expression;
function call(identifier: "ZEROBLOB", size: Expression): Expression;

// Built-In Mathematical SQL Functions
// @ref https://www.sqlite.org/lang_mathfunc.html
function call(
  identifier:
    | "ACOS"
    | "ACOSH"
    | "ASIN"
    | "ASINH"
    | "ATAN"
    | "ATANH"
    | "CEIL"
    | "CEILING"
    | "COS"
    | "COSH"
    | "DEGREES"
    | "EXP"
    | "FLOOR"
    | "LN"
    | "LOG"
    | "LOG2"
    | "LOG10"
    | "RADIANS"
    | "SIN"
    | "SINH"
    | "SQRT"
    | "TAN"
    | "TANH"
    | "TRUNC",
  X: Expression,
): Expression;
function call(identifier: "ATAN2", Y: Expression, X: Expression): Expression;
function call(identifier: "LOG", B: Expression, X: Expression): Expression;
function call(identifier: "MOD", X: Expression, Y: Expression): Expression;
function call(identifier: "POW", X: Expression, Y: Expression): Expression;
function call(identifier: "POWER", X: Expression, Y: Expression): Expression;
function call(identifier: "PI"): Expression;

// Built-In Date and Time Functions.
// @ref https://www.sqlite.org/lang_datefunc.html
function call(
  identifier: "DATE" | "DATETIME" | "JULIANDAY" | "TIME" | "UNIXEPOCH",
): Expression;
function call(
  identifier: "DATE" | "DATETIME" | "JULIANDAY" | "TIME" | "UNIXEPOCH",
  timeValue: Expression,
  ...modifiers: Expression[]
): Expression;
function call(identifier: "STRFTIME", format: Expression): Expression;
function call(
  identifier: "STRFTIME",
  format: Expression,
  timeValue: Expression,
  ...modifiers: Expression[]
): Expression;
function call(
  identifier: "TIMEDIFF",
  timeA: Expression,
  timeB: Expression,
): Expression;

// Built-In JSON Functions.
// @ref https://www.sqlite.org/json1.html
function call(identifier: "JSON" | "JSONB", json: Expression): Expression;
function call(
  identifier: "JSON_ARRAY" | "JSONB_ARRAY",
  ...values: Expression[]
): Expression;
function call(identifier: "JSON_ARRAY_LENGTH", json: Expression): Expression;
function call(
  identifier: "JSON_ARRAY_LENGTH",
  json: Expression,
  path: Expression,
): Expression;
function call(identifier: "JSON_ERROR_POSITION", json: Expression): Expression;
function call(
  identifier: "JSON_EXTRACT" | "JSONB_EXTRACT",
  json: Expression,
): Expression;
function call(
  identifier: "JSON_EXTRACT" | "JSONB_EXTRACT",
  json: Expression,
  ...paths: Expression[]
): Expression;
function call(
  identifier: "JSON_INSERT" | "JSONB_INSERT",
  json: Expression,
  path: Expression,
  ...values: Expression[]
): Expression;
function call(
  identifier: "JSON_OBJECT" | "JSONB_OBJECT",
  ...values: Expression[]
): Expression;
function call(
  identifier: "JSON_PATCH" | "JSONB_PATCH",
  json: Expression,
  patch: Expression,
): Expression;
function call(identifier: "JSON_PRETTY", json: Expression): Expression;
function call(
  identifier: "JSON_REMOVE" | "JSONB_REMOVE",
  json: Expression,
  ...paths: Expression[]
): Expression;
function call(
  identifier: "JSON_REPLACE" | "JSONB_REPLACE",
  json: Expression,
  ...values: Expression[]
): Expression;
function call(
  identifier: "JSON_SET" | "JSONB_SET",
  json: Expression,
  ...values: Expression[]
): Expression;
function call(identifier: "JSON_TYPE", json: Expression): Expression;
function call(
  identifier: "JSON_TYPE",
  json: Expression,
  path: Expression,
): Expression;
function call(identifier: "JSON_VALID", json: Expression): Expression;
function call(
  identifier: "JSON_VALID",
  json: Expression,
  flags: Expression,
): Expression;
function call(identifier: "JSON_QUOTE", value: Expression): Expression;

function call(
  identifier: "JSON_GROUP_ARRAY" | "JSONB_GROUP_ARRAY",
  value: Expression,
): Expression;
function call(
  identifier: "JSON_GROUP_OBJECT" | "JSONB_GROUP_OBJECT",
  label: Expression,
  value: Expression,
): Expression;

// Built-In Aggregate Functions.
// @ref https://sqlite.org/lang_aggfunc.html
function call(
  identifier: "AVG" | "COUNT" | "MAX" | "MIN" | "SUM" | "TOTAL",
  value: Expression,
): Expression;
function call(
  identifier: "GROUP_CONCAT" | "STRING_AGG",
  value: Expression,
): Expression;
function call(
  identifier: "GROUP_CONCAT" | "STRING_AGG",
  value: Expression,
  separator: Expression,
): Expression;

function call(identifier: "JSON_EACH", json: Expression): Expression;
function call(
  identifier: "JSON_EACH",
  json: Expression,
  path: Expression,
): Expression;
function call(identifier: "JSON_TREE", json: Expression): Expression;
function call(
  identifier: "JSON_TREE",
  json: Expression,
  path: Expression,
): Expression;

function call(...args: Parameters<typeof customCall>): Expression {
  return customCall(...args);
}

export { call, customCall };
