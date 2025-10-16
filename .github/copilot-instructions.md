# Rheactor Query Builder for SQLite - TypeScript

## Project Overview

A type-safe SQL query builder for SQLite that generates parameterized queries using method chaining. This is a query generator only (does not execute queries). Future plans include MySQL support.

## Project Philosophy

- Pure and simple Query Builder
- No unnecessary abstraction layers
- No runtime validations - user responsibility
- Focus on performance and basic type safety
- Minimalist and predictable design

## Performance Guidelines

- Zero overhead: no extra processing layers
- Maximum query generation optimization
- No runtime validations
- No unnecessary data transformations

## Architecture

- **Method Chaining Pattern**: Each query type returns specialized builder classes
- **Base Class**: Abstract `Builder` class with shared functionality
- **Specialized Builders**: `BuilderSelect`, `BuilderInsert`, `BuilderUpdate`, `BuilderDelete`
- Entry point: `sql.select()`, `sql.insert()`, etc.

## Supported Operations

- SELECT queries with WHERE, ORDER BY, LIMIT, OFFSET
- INSERT queries (single/batch)
- UPDATE queries with WHERE conditions
- DELETE queries with WHERE conditions
- Aggregate functions: COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING
- Subqueries (builders are compatible with Expression type)
- Function calls via `sql.call("FUNCTION_NAME", ...args)`

## Type System

- **Expression**: Represents any SQL expression value, including `Builder` and `Identifier`
- **Identifier**: Represents column/table identifiers
- Basic type safety without validation overhead

## Parameter Handling

- Uses SQLite numbered placeholders: `?1`, `?2`, `?3`
- Returns object with `{ query: string, parameters: any[] }`

## Extension Points

- `customCall(functionName, ...args)`: Call user-defined SQL functions
- `sql.raw(string)`: Insert raw SQL expressions when needed
- All standard SQL operators are available

## Workflow and Commands

**CRITICAL**: After any code modification:

- Run `pnpm test` to ensure no regressions
- If tests fail, analyze errors and fix them before proceeding
- If tests passes
  - Remove unused imports, variables, or functions immediately
  - Run `pnpm prettier:fix` (if available in package.json)
  - Run `pnpm eslint:fix` (if available in package.json)
  - Verify that fixes were applied successfully

## Code Style Guidelines

- **Always respond in Portuguese** when explaining changes or discussing code
- **No code comments**: Write self-documenting code with descriptive function/variable names
- **Naming convention**: Keep names concise but clear enough to understand their purpose at first read
- **Prefer inline code**: Avoid verbose code and unnecessary variables
- Only extract to variables when:
  - The inline version would be hard to understand
  - The function call doesn't clearly indicate the action being performed
  - The value is reused multiple times
- **No dead code**: Remove unused imports, variables, or functions immediately

## Task Planning

Before implementing any feature or fix:

1. Generate a minimum of 10 detailed to-dos outlining each step
2. Break down complex operations into atomic tasks
3. Include validation and testing steps in the to-do list

## Quality Assurance

After completing any task:

1. Review all changes for necessity and clarity
2. Ensure no unnecessary code was added
3. Verify no dead code remains
4. Confirm the solution is optimal and maintainable
5. Validate type safety is maintained

## Testing

- Framework: Vitest
- Focus on generated SQL correctness and parameter binding
- Always run tests after code changes

## Roadmap (Do Not Implement Yet)

- JOIN support (INNER, LEFT, RIGHT, CROSS)
- Transaction/savepoint support
- CTE (Common Table Expressions)

## Examples

```
// SELECT
const query =
  sql.select("id", "name")
    .from("users")
    .where(sql.op("age", ">", 18))
    .orderBy("name", "ASC")
    .limit(10);

// Aggregate
const count = sql.call("COUNT", "*");
```

## Response Format

When suggesting changes:

- Explain reasoning in Portuguese
- Provide complete, production-ready code
- Highlight key decisions made
- Include testing strategy when relevant
