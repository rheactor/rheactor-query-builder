import { describe, expect, it } from "vitest";

import type { Builder } from "@/Builder.js";
import sql from "@/index.js";
import type { Value } from "@/types/Value.js";

function alwaysFalse() {
  return false;
}

describe("class Builder", () => {
  type Test = [builder: Builder, sql: string, args: Value[]];

  const tests: Test[] = [
    [sql.select(), "SELECT TRUE", []],
    [sql.select(false), "SELECT TRUE", []],
    [sql.select(undefined), "SELECT TRUE", []],
    [sql.select(false, "test"), "SELECT [test]", []],
    [sql.select("test", false), "SELECT [test]", []],
    [sql.select("test", undefined), "SELECT [test]", []],
    [sql.select("test"), "SELECT [test]", []],
    [sql.select("test", "test"), "SELECT [test], [test]", []],
    [sql.select("test1", "test2"), "SELECT [test1], [test2]", []],
    [sql.select(sql.value(123)), "SELECT ?1", [123]],
    [
      sql.select().selectAliased("test1", "test2"),
      "SELECT [test1] AS [test2]",
      [],
    ],
    [
      sql
        .select("test0")
        .selectAliased("test1", "test2")
        .selectAliased("test3", "test4")
        .selectAliased(false, "test5"),
      "SELECT [test0], [test1] AS [test2], [test3] AS [test4]",
      [],
    ],
    [sql.select().from(false), "SELECT TRUE", []],
    [sql.select().from("test"), "SELECT TRUE FROM [test]", []],
    [sql.select().from("test", "test"), "SELECT TRUE FROM [test], [test]", []],
    [
      sql
        .select()
        .fromAliased("test1", "test2")
        .fromAliased(sql.value(123), "test2"),
      "SELECT TRUE FROM [test1] AS [test2], ?1 AS [test2]",
      [123],
    ],
    [sql.select().limit(10), "SELECT TRUE LIMIT 10", []],
    [sql.select().limit(false), "SELECT TRUE", []],
    [sql.select().limit(undefined), "SELECT TRUE", []],
    [sql.select().limit(10, 5), "SELECT TRUE LIMIT 10 OFFSET 5", []],
    [sql.select().limit(false, 5), "SELECT TRUE OFFSET 5", []],
    [sql.select().limit(undefined, 5), "SELECT TRUE OFFSET 5", []],
    [sql.select().limit(10, false), "SELECT TRUE LIMIT 10", []],
    [sql.select().limit(false, undefined), "SELECT TRUE", []],
    [sql.select().limit(undefined, 0), "SELECT TRUE", []],
    [
      sql.select().limit(sql.value(10), sql.value(20)),
      "SELECT TRUE LIMIT ?1 OFFSET ?2",
      [10, 20],
    ],
    [sql.select().offset(0), "SELECT TRUE", []],
    [sql.select().offset(10), "SELECT TRUE OFFSET 10", []],
    [sql.select().offset(false), "SELECT TRUE", []],
    [sql.select().offset(undefined), "SELECT TRUE", []],
    [sql.select().offset(sql.value(10)), "SELECT TRUE OFFSET ?1", [10]],
    [sql.select().offset(10).limit(5), "SELECT TRUE LIMIT 5 OFFSET 10", []],
    [sql.select().where(false), "SELECT TRUE", []],
    [sql.select().where(null), "SELECT TRUE", []],
    [sql.select().where(undefined), "SELECT TRUE", []],
    [sql.select().where(sql.value("")), "SELECT TRUE WHERE ?1", [""]],
    [sql.select().where(sql.value("ABC")), "SELECT TRUE WHERE ?1", ["ABC"]],
    [sql.select().where(sql.value(true)), "SELECT TRUE WHERE ?1", [1]],
    [sql.select().where(sql.value(false)), "SELECT TRUE WHERE ?1", [0]],
    [sql.select().where(sql.value(null)), "SELECT TRUE WHERE ?1", [null]],
    [sql.select().where(sql.value(123)), "SELECT TRUE WHERE ?1", [123]],
    [
      sql.select().where(sql.eq("test1", "test2")),
      "SELECT TRUE WHERE [test1] = [test2]",
      [],
    ],
    [
      sql.select().where(sql.eq("test", sql.value(123))),
      "SELECT TRUE WHERE [test] = ?1",
      [123],
    ],
    [
      sql
        .select()
        .where(
          sql.eq("test1", sql.value(123)),
          sql.eq("test2", sql.value(123)),
        ),
      "SELECT TRUE WHERE [test1] = ?1 AND [test2] = ?2",
      [123, 123],
    ],
    [
      sql
        .select()
        .where(
          sql.eq("test1", sql.value(123)),
          sql.eq("test2", sql.value(456)),
        ),
      "SELECT TRUE WHERE [test1] = ?1 AND [test2] = ?2",
      [123, 456],
    ],
    [
      sql.select().where(sql.neq("test", sql.value(123))),
      "SELECT TRUE WHERE [test] != ?1",
      [123],
    ],
    [
      sql.select().where(sql.gt("test", sql.value(123))),
      "SELECT TRUE WHERE [test] > ?1",
      [123],
    ],
    [
      sql.select().where(sql.gte("test", sql.value(123))),
      "SELECT TRUE WHERE [test] >= ?1",
      [123],
    ],
    [
      sql.select().where(sql.lt("test", sql.value(123))),
      "SELECT TRUE WHERE [test] < ?1",
      [123],
    ],
    [
      sql.select().where(sql.lte("test", sql.value(123))),
      "SELECT TRUE WHERE [test] <= ?1",
      [123],
    ],
    [
      sql.select().where(sql.not(sql.eq("test", sql.value(123)))),
      "SELECT TRUE WHERE NOT [test] = ?1",
      [123],
    ],
    [
      sql.select().where(sql.not(sql.not(sql.eq("test", sql.value(123))))),
      "SELECT TRUE WHERE NOT NOT [test] = ?1",
      [123],
    ],
    [
      sql.select().where(sql.between("test", sql.value(123), sql.value(123))),
      "SELECT TRUE WHERE [test] BETWEEN ?1 AND ?2",
      [123, 123],
    ],
    [
      sql.select().where(sql.between("test", sql.value(123), sql.value(456))),
      "SELECT TRUE WHERE [test] BETWEEN ?1 AND ?2",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(sql.notBetween("test", sql.value(123), sql.value(123))),
      "SELECT TRUE WHERE NOT [test] BETWEEN ?1 AND ?2",
      [123, 123],
    ],
    [
      sql
        .select()
        .where(sql.notBetween("test", sql.value(123), sql.value(456))),
      "SELECT TRUE WHERE NOT [test] BETWEEN ?1 AND ?2",
      [123, 456],
    ],
    [
      sql.select().where(sql.isNull("test")),
      "SELECT TRUE WHERE [test] IS NULL",
      [],
    ],
    [
      sql.select().where(sql.isNotNull("test")),
      "SELECT TRUE WHERE NOT [test] IS NULL",
      [],
    ],
    [sql.select().where(sql.or(false)), "SELECT TRUE", []],
    [sql.select().where(sql.or(false), sql.or(false)), "SELECT TRUE", []],
    [
      sql.select().where(sql.or(sql.eq("test1", sql.value(123)))),
      "SELECT TRUE WHERE [test1] = ?1",
      [123],
    ],
    [
      sql
        .select()
        .where(
          sql.or(
            sql.eq("test1", sql.value(123)),
            false,
            sql.eq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE ([test1] = ?1 OR [test2] = ?2)",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(
          sql.and(
            sql.eq("test1", sql.value(123)),
            false,
            sql.eq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE ([test1] = ?1 AND [test2] = ?2)",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(
          sql.or(sql.eq("test1", sql.value(123))),
          sql.and(sql.eq("test2", sql.value(123))),
        ),
      "SELECT TRUE WHERE [test1] = ?1 AND [test2] = ?2",
      [123, 123],
    ],
    [
      sql
        .select()
        .where(
          sql.and(
            sql.eq("test1", sql.value(123)),
            sql.or(false),
            sql.eq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE ([test1] = ?1 AND [test2] = ?2)",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(
          sql.and(
            sql.eq("test1", sql.value(123)),
            sql.or(sql.isNotNull("test2")),
            sql.neq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE ([test1] = ?1 AND NOT [test2] IS NULL AND [test2] != ?2)",
      [123, 456],
    ],
    [
      sql.select().where(sql.collate("test")),
      "SELECT TRUE WHERE [test] COLLATE BINARY",
      [],
    ],
    [
      sql.select().where(sql.collate("test", "NOCASE")),
      "SELECT TRUE WHERE [test] COLLATE NOCASE",
      [],
    ],
    [sql.select().where(sql.raw("123!")), "SELECT TRUE WHERE 123!", []],
    [
      sql.select().where(sql.jsonValue([1, 2, 3])),
      "SELECT TRUE WHERE ?1",
      ["[1,2,3]"],
    ],
    [
      sql.select().where(sql.jsonValue({ abc: 123 })),
      "SELECT TRUE WHERE ?1",
      ['{"abc":123}'],
    ],
    [
      sql.select().where(sql.cast("test", "INTEGER")),
      "SELECT TRUE WHERE CAST([test] AS INTEGER)",
      [],
    ],
    [
      sql.select().where(sql.cast(sql.value("test"), "INTEGER")),
      "SELECT TRUE WHERE CAST(?1 AS INTEGER)",
      ["test"],
    ],
    [
      sql.select().where(sql.call("UNIXEPOCH")),
      "SELECT TRUE WHERE UNIXEPOCH()",
      [],
    ],
    [
      sql.select().where(sql.call("JSON_QUOTE", sql.value("test"))),
      "SELECT TRUE WHERE JSON_QUOTE(?1)",
      ["test"],
    ],
    [
      sql.select().where(sql.call("JSON_QUOTE", sql.value(false))),
      "SELECT TRUE WHERE JSON_QUOTE(?1)",
      [0],
    ],
    [
      sql.select().where(sql.call("JSON_QUOTE", sql.call("UNIXEPOCH"))),
      "SELECT TRUE WHERE JSON_QUOTE(UNIXEPOCH())",
      [],
    ],
    [
      sql
        .select()
        .where(
          sql.call(
            "JSON_INSERT",
            sql.jsonValue({}),
            sql.value("$[#]"),
            sql.value(123),
          ),
        ),
      "SELECT TRUE WHERE JSON_INSERT(?1, ?2, ?3)",
      ["{}", "$[#]", 123],
    ],
    [
      sql.select().where(sql.exists(sql.select())),
      "SELECT TRUE WHERE EXISTS ( SELECT TRUE )",
      [],
    ],
    [sql.select().where(sql.staticValue(true)), "SELECT TRUE WHERE TRUE", []],
    [sql.select().where(sql.staticValue(false)), "SELECT TRUE WHERE FALSE", []],
    [sql.select().where(sql.staticValue("")), 'SELECT TRUE WHERE ""', []],
    [sql.select().where(sql.staticValue("123")), 'SELECT TRUE WHERE "123"', []],
    [sql.select().where(sql.staticValue(123)), "SELECT TRUE WHERE 123", []],
    [
      sql.select().where(sql.staticValue(123.456)),
      "SELECT TRUE WHERE 123.456",
      [],
    ],
    [
      sql.select().where(sql.staticValue(98765432123456789n)),
      "SELECT TRUE WHERE 98765432123456789",
      [],
    ],
    [sql.select().where(sql.staticValue(null)), "SELECT TRUE WHERE NULL", []],
    [
      sql.select().when(false, (builder) => builder.where(sql.value(true))),
      "SELECT TRUE",
      [],
    ],
    [
      sql.select().when(true, (builder) => builder.where(sql.value(true))),
      "SELECT TRUE WHERE ?1",
      [1],
    ],
    [
      sql
        .select("id", "name")
        .from("users")
        .where(sql.eq("name", sql.collate(sql.value("John"), "NOCASE")))
        .where(alwaysFalse() && sql.value("always ignore"))
        .limit(sql.staticValue(10), sql.value(20)),
      "SELECT [id], [name] FROM [users] WHERE [name] = ?1 COLLATE NOCASE LIMIT 10 OFFSET ?2",
      ["John", 20],
    ],
    [sql.update("test"), "UPDATE [test]", []],
    [
      sql.update("test").set("index", "123"),
      "UPDATE [test] SET [index] = [123]",
      [],
    ],
    [
      sql.update("test").set("index", sql.value(123)),
      "UPDATE [test] SET [index] = ?1",
      [123],
    ],
    [
      sql.update("test").where(sql.eq("index", sql.value(123))),
      "UPDATE [test] WHERE [index] = ?1",
      [123],
    ],
    [sql.delete().from("test"), "DELETE FROM [test]", []],
    [
      sql
        .delete()
        .from("test")
        .where(sql.eq("index", sql.value(123))),
      "DELETE FROM [test] WHERE [index] = ?1",
      [123],
    ],
    [sql.insert("id", "name"), "INSERT INTO", []],
    [
      sql.insert("id", "name").into("test"),
      "INSERT INTO [test] ([id], [name])",
      [],
    ],
    [
      sql.insert("id", "name").into("test").values("index", sql.value(123)),
      "INSERT INTO [test] ([id], [name]) VALUES ([index], ?1)",
      [123],
    ],
    [
      sql
        .insert("id", "name")
        .into("test")
        .values("index", sql.value(123))
        .values(sql.eq("id", sql.value(456)), sql.staticValue(null)),
      "INSERT INTO [test] ([id], [name]) VALUES ([index], ?1), ([id] = ?2, NULL)",
      [123, 456],
    ],
  ];

  it.each(tests)(
    "[#%#]%c %s (%j)",
    (builder, expectedQuery, expectedParameters) => {
      expect(builder.build()).toStrictEqual({
        query: expectedQuery,
        parameters: expectedParameters,
      });
    },
  );
});
